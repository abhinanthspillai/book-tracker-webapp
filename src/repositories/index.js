import { LocalStorageRepository } from './localStorageRepository.js'
import { ApiRepository } from './apiRepository.js'

// Choose repository based on environment variable
// VITE_STORAGE=local (default) or VITE_STORAGE=api
const storageType = import.meta.env.VITE_STORAGE || 'local'

let repository

if (storageType === 'api') {
  repository = new ApiRepository()
} else {
  repository = new LocalStorageRepository()
}

export default repository
