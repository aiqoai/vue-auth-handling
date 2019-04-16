<template>
    <div>
        <h4>Login</h4>
        <form>
            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required autofocus>
            </div>
            <div>
                <label for="password" >Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
                </button>
            </div>
        </form>
    </div>
</template>
<!--<script>-->
<!--  export default {-->
<!--        data(){-->
<!--            return {-->
<!--                email : "",-->
<!--                password : ""-->
<!--            }-->
<!--        },-->
<!--        methods : {-->
<!--            handleSubmit(e){-->
<!--                e.preventDefault()-->
<!--                if (this.password.length > 0) {-->
<!--                    this.$http.post('http://localhost:4000/api/userlogin', {-->
<!--                        email: this.email,-->
<!--                        password: this.password-->
<!--                    })-->
<!--                    .then(response => {-->
<!--                        let is_admin = response.data.user.is_admin-->
<!--                        localStorage.setItem('user',JSON.stringify(response.data.user))-->
<!--                        localStorage.setItem('jwt',response.data.token)-->
<!--                        -->
<!--                        if (localStorage.getItem('jwt') != null){-->
<!--                            this.$emit('loggedIn')-->
<!--                            if(this.$route.params.nextUrl != null){-->
<!--                                this.$router.push(this.$route.params.nextUrl)-->
<!--                            }-->
<!--                            else {-->
<!--                                if(is_admin== 1){-->
<!--                                    this.$router.push('admin')-->
<!--                                }-->
<!--                                else {-->
<!--                                    this.$router.push('dashboard')-->
<!--                                }-->
<!--                            }-->
<!--                        }-->
<!--                    })-->
<!--                    .catch(function (error) {-->
<!--                        console.error(error.response);-->
<!--                    });-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->
<script>
  import {HTTP} from '../store/httpcommon'
  export default {
    props : ['nextUrl'],
    data(){
      return {
        name : "george",
        email : "1@1.com",
        password : "1",
        password_confirmation : "1",
        is_admin : 0
      }
    },
    methods : {
      handleSubmit(e) {
        console.log(" click")
        e.preventDefault()

        if (this.password === this.password_confirmation && this.password.length > 0)
        {
          console.log(" sent http")


          // let url = 'http://localhost:3000/register'
          //if(this.is_admin != null || this.is_admin == 1)//url = 'http://localhost:3000/register-admin'

          HTTP.post('/api/user/auth', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
            .then(response => {

              console.log(" login succeeded", response.data)
              localStorage.setItem('user',JSON.stringify(response.data.data.user))
              localStorage.setItem('jwt',response.data.data.token)
              console.log(" this.$route.params", this.$route.params)

              // this.$router.push('/profile')

              if (localStorage.getItem('jwt') != null){

                // this.$emit('loggedIn')

                if(this.$route.params.nextUrl != null){
                  this.$router.push(this.$route.params.nextUrl)
                }
                else{
                  this.$router.push('/catalogue')
                }
              }
            })
            .catch(error => {
              console.error(error);
            });



        } else {
          this.password = ""
          this.passwordConfirm = ""

          return alert('Passwords do not match')
        }
      }
    }
  }
</script>
