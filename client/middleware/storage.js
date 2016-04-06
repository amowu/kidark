
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

// Now it's time to decide which storage engine should be used
//
// Note: The arguments to `createEngine` are different for every engine!
const engine = createEngine('YOUR_LOCALSTORAGE_KEY')

// And with the engine we can create our middleware function. The middleware
// is responsible for calling `engine.save` with the current state after
// every dispatched action.
//
// Note: You can provide a list of action types as second argument, those
//       actions will be filtered and WON'T trigger calls to `engine.save`!
const middleware = storage.createMiddleware(engine)

export default middleware
