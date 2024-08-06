import Authentication from '../components/pages/Authentication'
import Axios from 'axios'

function saveClient(client) {
  Axios.post(`http://localhost:8080/addClient`, client, {
    headers: {'Authorization': Authentication.getAuthenticationHeader(this)},
    params: {user_id: this.$cookie.get('user_id')}
  })
    .then(res => {
      this.resetFields(client)
      this.snackbar = true
      this.message = res.data.message
      this.snackColor = 'green lighten-1'
      this.getAllClients(this);
    })
    .catch(error => {
      this.errorHandler(error)
    })
}

function getAllClients(vueObject) {
  Axios.get(`http://localhost:8080/addClient`, {
    headers: {'Authorization': Authentication.getAuthenticationHeader(vueObject)},
    params: {user_id: this.$cookie.get('user_id')}
  }).then(({data}) => {
    vueObject.clients =data
  }).catch(error => {
    vueObject.errorHandler(error)
  })
}



export default {
  saveClient: saveClient
}
