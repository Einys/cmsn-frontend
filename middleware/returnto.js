export default function ({ req, store, redirect }) {
  console.log('returnto middleware', req)
  if(req && req.session){
    console.log( 'req session:', req.session )
    redirect(req.session.returnTo || '/')
  }
}
