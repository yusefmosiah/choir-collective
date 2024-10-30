import logging
from typing import List, Dict, Any, Optional
from .config import Config
from litellm import completion, embedding
import json
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def get_embedding(input_text: str, model: str) -> List[float]:
    try:
        # Chunk the input text
        chunks = chunk_text(input_text, chunk_size=4000, overlap=200)

        # Get embeddings for each chunk
        chunk_embeddings = []
        for chunk in chunks:
            response = embedding(
                model=f"azure/{model}",
                input=chunk,
                api_key=Config.AZURE_API_KEY,
                api_base=Config.AZURE_API_BASE,
                api_version=Config.AZURE_API_VERSION
            )
            chunk_embeddings.append(response['data'][0]['embedding'])

        # Average the embeddings if there are multiple chunks
        if len(chunk_embeddings) > 1:
            averaged_embedding = [sum(x) / len(chunk_embeddings) for x in zip(*chunk_embeddings)]
            return averaged_embedding
        else:
            return chunk_embeddings[0]
    except Exception as e:
        logger.error(f"Error getting embedding: {e}")
        return []

async def chat_completion(messages: List[Dict[str, str]], model: str, max_tokens: int, temperature: float, functions: List[Dict[str, Any]] = None) -> str:
    try:
        response = completion(
            model=model,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
            functions=functions
        )
        if response and response.choices:
            return response.choices[0].message.content or ""
        else:
            logger.error("No choices returned in chat completion response")
            return "error"
    except Exception as e:
        logger.error(f"Error during chat completion: {e}")
        return "error"

def chunk_text(text: str, chunk_size: int, overlap: int) -> List[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

async def structured_chat_completion(
    messages: List[Dict[str, str]],
    config: Config,
    response_format: Optional[BaseModel] = None
) -> Dict[str, Any]:
    """
    Make a structured chat completion call that returns data in a specified format.

    Args:
        messages: List of message dictionaries with 'role' and 'content'
        config: Config object containing model settings
        response_format: Pydantic model or dict specifying the expected response structure

    Returns:
        Dict with parsed response matching the specified format
    """
    try:
        response = completion(
            model=config.CHAT_MODEL,
            messages=messages,
            max_tokens=config.MAX_TOKENS,
            temperature=config.TEMPERATURE,
            response_format=response_format
        )

        # LiteLLM handles the parsing when response_format is provided
        return {
            "status": "success",
            "content": response.choices[0].message.parsed if response_format else response.choices[0].message.content
        }

    except Exception as e:
        logger.error(f"Error in structured chat completion: {str(e)}")
        return {
            "status": "error",
            "content": f"An error occurred: {str(e)}"
        }

__all__ = ['get_embedding', 'chat_completion', 'chunk_text', 'structured_chat_completion']
