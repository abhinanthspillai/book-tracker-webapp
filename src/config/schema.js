// Book model schema and configuration
export const STATUSES = {
  WANT: 'want',
  READING: 'reading',
  FINISHED: 'finished',
}

export const STATUS_LABELS = {
  [STATUSES.WANT]: 'Want to Read',
  [STATUSES.READING]: 'Reading',
  [STATUSES.FINISHED]: 'Finished',
}

export const STATUS_COLORS = {
  [STATUSES.WANT]: '#5B6B7A',
  [STATUSES.READING]: '#B8812E',
  [STATUSES.FINISHED]: '#3F7D58',
}

export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Technology',
  'Health',
  'Travel',
  'Other',
]

export const RATING_OPTIONS = [0, 1, 2, 3, 4, 5]

export const BOOK_FIELDS = {
  id: {
    type: 'string',
    required: true,
    label: 'ID',
  },
  title: {
    type: 'string',
    required: true,
    label: 'Title',
    minLength: 1,
    maxLength: 500,
  },
  author: {
    type: 'string',
    required: true,
    label: 'Author',
    minLength: 1,
    maxLength: 200,
  },
  genre: {
    type: 'string',
    required: false,
    label: 'Genre',
    enum: GENRES,
  },
  status: {
    type: 'string',
    required: true,
    label: 'Status',
    enum: Object.values(STATUSES),
    default: STATUSES.WANT,
  },
  totalPages: {
    type: 'number',
    required: false,
    label: 'Total Pages',
    min: 1,
  },
  currentPage: {
    type: 'number',
    required: false,
    label: 'Current Page',
    min: 0,
    default: 0,
  },
  rating: {
    type: 'number',
    required: false,
    label: 'Rating',
    min: 0,
    max: 5,
    default: 0,
  },
  notes: {
    type: 'string',
    required: false,
    label: 'Notes',
    maxLength: 5000,
  },
  coverUrl: {
    type: 'string',
    required: false,
    label: 'Cover URL',
    pattern: /^https?:\/\/.+/,
  },
  addedAt: {
    type: 'string',
    required: true,
    label: 'Added Date',
  },
  finishedAt: {
    type: 'string',
    required: false,
    label: 'Finished Date',
  },
}

export const createBook = (data) => {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: '',
    author: '',
    genre: '',
    status: STATUSES.WANT,
    totalPages: null,
    currentPage: 0,
    rating: 0,
    notes: '',
    coverUrl: '',
    addedAt: now,
    finishedAt: null,
    ...data,
  }
}

export const validateBook = (book) => {
  const errors = {}

  // Validate title
  if (!book.title || book.title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (book.title.length > BOOK_FIELDS.title.maxLength) {
    errors.title = `Title must be less than ${BOOK_FIELDS.title.maxLength} characters`
  }

  // Validate author
  if (!book.author || book.author.trim().length === 0) {
    errors.author = 'Author is required'
  } else if (book.author.length > BOOK_FIELDS.author.maxLength) {
    errors.author = `Author must be less than ${BOOK_FIELDS.author.maxLength} characters`
  }

  // Validate totalPages
  if (book.totalPages !== null && book.totalPages !== undefined) {
    if (book.totalPages < 1) {
      errors.totalPages = 'Total pages must be at least 1'
    }
  }

  // Validate currentPage
  if (book.currentPage < 0) {
    errors.currentPage = 'Current page cannot be negative'
  } else if (book.totalPages && book.currentPage > book.totalPages) {
    errors.currentPage = 'Current page cannot exceed total pages'
  }

  // Validate rating
  if (book.rating < 0 || book.rating > 5) {
    errors.rating = 'Rating must be between 0 and 5'
  }

  // Validate genre
  if (book.genre && !GENRES.includes(book.genre)) {
    errors.genre = 'Invalid genre'
  }

  // Validate status
  if (!Object.values(STATUSES).includes(book.status)) {
    errors.status = 'Invalid status'
  }

  // Validate coverUrl
  if (book.coverUrl && !BOOK_FIELDS.coverUrl.pattern.test(book.coverUrl)) {
    errors.coverUrl = 'Cover URL must be a valid HTTP/HTTPS URL'
  }

  // Validate notes
  if (book.notes && book.notes.length > BOOK_FIELDS.notes.maxLength) {
    errors.notes = `Notes must be less than ${BOOK_FIELDS.notes.maxLength} characters`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
