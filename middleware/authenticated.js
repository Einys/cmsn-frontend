export default function ({ store, redirect }) {
  // 유저가 권한이 없다면
  if (!store.state.authUser) {
    return redirect('/mypage/login')
  }
}
