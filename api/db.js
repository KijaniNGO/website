import { connect } from 'camo'

let db
connect('nedb://.nedb').then((database) => db = database)

export default db
