'use client';

import { useBasicProgram } from './basic-data-access'

export function BasicCreate() {
  const { initialize, createMessage } = useBasicProgram();

  return (
    <div className="flex flex-col gap-4">
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={() => initialize.mutateAsync()}
        disabled={initialize.isPending}
      >
        Initialize{initialize.isPending && '...'}
      </button>
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={() => createMessage.mutateAsync('Hello, Solana!')}
        disabled={createMessage.isPending}
      >
        Create Message{createMessage.isPending && '...'}
      </button>
    </div>
  );
}

export function BasicProgram() {
  const { getProgramAccount } = useBasicProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      <pre>{JSON.stringify(getProgramAccount.data.value, null, 2)}</pre>
    </div>
  );
}
