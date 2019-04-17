<template>
    <div>
     <el-row :gutter="24">
          <el-col :span="8" :offset="8" >
               <img src="../assets/login.png"width=100%>

               <el-card class="box-card">
                    <div class="header"style="text-align: center;">
                         <h2>Create Account</h2>
                    </div>

                    <form>
                           <h3 for="name">Name</h3>
                           <div>
                               <input id="name" type="text" v-model="name" required autofocus>
                           </div>

                           <h3 for="email" >E-Mail Address</h3>
                           <div>
                               <input id="email" type="email" v-model="email" required>
                           </div>
                            
                           <h3 for="password">Password</h3>
                           <div>
                               <input id="password" type="password" v-model="password" required>
                           </div>
                           
                           <h3 for="password-confirm">Confirm Password</h3>
                           <div>
                               <input id="password-confirm" type="password" v-model="password_confirmation" required>
                           </div>
                           
                           <label for="password-confirm">Is this an administrator account?</label>
                           <div>
                               <select v-model="is_admin">
                                   <option value=1>Yes</option>
                                   <option value=0>No</option>
                               </select>
                           </div>

                           <div>
                              <label>{{err_notice}}</label>
                             <br/>
                               <button type="submit" @click="handleSubmit">
                                   Register
                               </button>
                           </div>
        </form>

               </el-card>
          </el-col>
     </el-row>

       
    </div>
</template>

<script>
  import {HTTP} from '../store/httpcommon'
  import{mapMutations} from 'vuex'
  import {setCurrentUserData} from '../store/userStore'
    export default {
        props : ['nextUrl'],
        data(){
            return {
                err_notice:"",
                name : "george",
                email : "1@1.com",
                password : "1",
                password_confirmation : "1",
              is_admin : 0
            }
        },
      computed:{

      },

        methods : {
          ...mapMutations([
            'setCurrentUserData'
          ]),
            handleSubmit(e) {
              console.log(" click")
              this.err_notice="";
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                  console.log(" sent http")


                    // let url = 'http://localhost:3000/register'
                    //if(this.is_admin != null || this.is_admin == 1)//url = 'http://localhost:3000/register-admin'

                    HTTP.post('/api/user/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                    .then(response => {

                      console.log(" Registration Succeeded", response.data);
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        // localStorage.setItem('jwt',response.data.token)
                      console.log(" this.$route.params", this.$route.params)
                      this.setCurrentUserData(response.data.data)

                      // this.$router.push('/profile')

                        // if (localStorage.getItem('jwt') != null){

                            // this.$emit('loggedIn')

                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/login')
                            }
                        // }
                    })
                    .catch(error => {
                      if(error.response.status==409)
                        {
                          this.err_notice=error.response.data.message
                          console.error(error.response.data);

                        }
                      console.error(error.response.statusText);



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
