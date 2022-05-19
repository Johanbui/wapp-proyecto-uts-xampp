const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  users_roles: state => state.user.users_rols,
  user_id: state => state.user.user_id,
  name: state => state.user.name,
  user: state => state.user
}
export default getters
