export default function ({ store, redirect }) {

  // 페이지 로딩 초반에 authUser 가 없는 문제때문에 새로고침 하면 로그인 페이지가 떠서 안쓴다...

  // 유저가 권한이 없다면
  if (!store.state.authUser) {
    return redirect('/mypage/login')
  }
}
