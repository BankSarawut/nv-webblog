<template>
<div>
    <h1>Get All Users</h1>
    <div v-if="users.length">
        <div>จำวนวผู้ใช้งาน {{users.length}} </div>
        <p><button v-on:click="navigateTo('/user/create')"> 
                สร้างผู้ใช้งาน 
            </button>
        </p>

        <div v-for="user in users" v-bind:key="user.id">
            <p>id:{{user.id}}</p>
            <p>ชื่อ-นามสกุล:{{ user.name }} - {{user.lastname}}</p>
            <p>Email:{{ user.email }}</p>
            <p>Password:{{ user.password }}</p>
            <p>
                <button v-on:click="navigateTo('/user/'+user.id)"> 
                ดูข้อมูลผู้ใช้ 
                </button>
                <button v-on:click="navigateTo('/user/edit/'+user.id)"> 
                แก้ไขข้อมูล
                </button>
                <button v-on:click="deleteUser(user)"> 
                ลบข้อมูล
                </button>
            </p>
            <hr>
        </div>
        <p><button v-on:click = "logout">Logout</button></p>
    </div>
</div>
</template>
<script>
import UsersService from '@/services/UsersService'

export default{
    data(){
        return{
            users: []
        }
    },
    async created(){
        try{
            this.users = (await UsersService.index()).data;
        }catch(error){
            console.log(error);
        }
    },
    methods:{
        navigateTo(route){
            this.$router.push(route)
        },
        async deleteUser(user){
            let result = confirm("Want to delete")
            if(result){
              try{
                  await UsersService.delete(user)
                  this.refreshData()
              }catch(error){
                  console.log(error)
              }

            }
        },
        async refreshData(){
            this.users = (await UsersService.index()).data
        },
        logout(){
            this.$store.dispatch('setToken',null)
            this.$$store.dispatch('setUser',null)
            this.$router.push({
                name:'loogin'
            })
        }
    },         
};

</script>
<style scoped>

</style>