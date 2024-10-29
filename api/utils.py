import logging
from typing import List, Dict, Any
from config import Config
from litellm import completion, embedding
import json

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

async def _structured_chat_completion(messages: List[Dict[str, str]], config: Config) -> Dict[str, Any]:
    try:
        response = completion(
            model=config.CHAT_MODEL,
            messages=messages,
            max_tokens=config.MAX_TOKENS,
            temperature=config.TEMPERATURE
        )
        content = response.choices[0].message.content
        try:
            parsed_content = json.loads(content)
            if isinstance(parsed_content, dict) and 'content' in parsed_content:
                content = parsed_content['content']
        except json.JSONDecodeError:
            pass  # Content is not JSON, use as is
        return {"status": "success", "content": content}
    except Exception as e:
        logger.error(f"Error in structured chat completion: {str(e)}")
        return {"status": "error", "content": f"An error occurred: {str(e)}"}
