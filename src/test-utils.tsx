import { render } from '@testing-library/react'
import { ReactElement } from 'react'

// Mock the wallet provider
jest.mock('./components/solana/solana-provider', () => ({
  WalletButton: () => null,
}))

// Mock the account checker
jest.mock('./components/account/account-ui', () => ({
  AccountChecker: () => null,
}))

// Mock the cluster components
jest.mock('./components/cluster/cluster-ui', () => ({
  ClusterChecker: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ClusterUiSelect: () => null,
  ExplorerLink: () => null,
}))

const customRender = (ui: ReactElement) => {
  return render(ui)
}

export * from '@testing-library/react'
export { customRender as render }
