<template>

    <el-row :gutter="24">
        <el-col :span="8" :offset="8" >
            <div class=headerimg>
                <img src="../assets/login.png" width="100%">
            </div>
              <el-card class="box-card">
                <div class="login-content" style="text-align: center;">
                    <h2>Login</h2>

                </div>
                
                <form>
                    <h3 for="email" >E-Mail Address</h3>
                    <div>
                        <input id="email" type="email" v-model="email" required autofocus>
                    </div>
                    <div>
                        <h3 for="password" >Password</h3>
                        <div>
                            <input id="password" type="password" v-model="password" required>
                        </div>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <button class="button1" type="submit" @click="handleSubmit" >
                                Login 
                            </button>
                        </el-col>
                       <!--   <el-col :span="12">
                            <button class="button2" type="submit" @click="handleSubmit" >
                                Signup
                            </button>
                        </el-col> -->
                    </el-row>
                </form>

                </el-card>
        </el-col>
    </el-row>
</template>
<style>
    .headerimg{
        margin-left: 0px;
    }
    h2{
    font-size:30px;
    color: #1A708E;
}
 h3{
    font-size:18px;
    color: #1A708E;
}

input{width:100%;
height: 30px;}
.button1{
border-radius: 10px;
     background-color: #EF843C;
  border: none;
  color: white;
  padding: 15px 90px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 30px 2px;
  cursor: pointer;
}
.button1:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
.button2{
border-radius: 10px;
     background-color: #06597D;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 30px 2px;
  cursor: pointer;
}
.button2:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>

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
  import {mapMutations} from 'vuex'
  export default {
    props : ['nextUrl'],
    data(){
      return {
        name : "george",
        email : "1@1.com",
        password : "1",
        is_admin : 0
      }
    },
    methods : {
      ...mapMutations([
        'setCurrentUserData'
      ]),
      handleSubmit(e) {
        console.log(" click")
        e.preventDefault()

        if (this.password )
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
              // localStorage.setItem('user',JSON.stringify(response.data.data.user))
              localStorage.setItem('jwt',response.data.data.token)
              console.log(" this.$route.params", this.$route.params)
              this.setCurrentUserData(response.data.data)

              // this.$router.push('/profile')

              if (localStorage.getItem('jwt') != null){

                // this.$emit('loggedIn')

                if(this.$route.params.nextUrl != null){
                  this.$router.push(this.$route.params.nextUrl)
                }
                else{
                  this.$router.push('/')
                }
              }
            })
            .catch(error => {
              console.error(error);
            });



        } else {
          this.password = ""

          return alert('Username and Passwords do not match')
        }
      }
    }
  }
</script>
