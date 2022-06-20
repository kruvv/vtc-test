<template>
  <div class="row">    
    <div class="col-sm-6 mx-auto">      
      <form class="mt-4"  @submit.prevent="sendData" novalidate>

        <div v-show="step===1" class="step">
          <h1 class="mb-4">Введите данные для поиска</h1>
          <div class=" form-user mb-3" v-for="field in fields" :key="field.id">
            <label :for="field.id" class="form-label">{{field.name}}</label>
            <input 
              :type="field.type" 
              :name="field.name" 
              :id="field.id" 
              :placeholder="field.placeholder"
              :maxlenght="field.maxlenght" 
              class="form-control" 
              v-model="field.id"
            />  
          </div>
          <input type="submit" name="" class="btn btn-primary col-sm-3" value="Отправить" @click="sendData"/>
        </div>

        <div v-show="step===2" class="step">
          <h1 class="mb-4">Результат поиска</h1>
          <div class="mb-3" >
            Здесь Результат
          </div>
          <input type="button" name="" class="btn btn-primary col-sm-3" value="Назад" @click="backStep"/>
        </div>

      </form> 
    </div>         
  </div>    
</template>

<script>

export default {
  components: { },
  data () {
    return {
      step:1,
      fields: [
        {id: 'lastName', type: 'text', name: 'Фамилия', placeholder: 'Иванов'},
        {id: 'firstName', type: 'text', name: 'Имя', placeholder: 'Иван'},
        {id: 'patronymic', type: 'text', name: 'Отчество', placeholder: 'Иванович'},
        {id: 'birthday', type: 'date', name: 'Дата рождения'},
        {id: 'inn', type: 'text', name: 'ИНН', placeholder: '774301390154', maxlength: 12},
        {id: 'passport', type: 'text', name: 'Номер и серию паспорта', placeholder: '1236568799', maxlength: 10}
      ],
      fieldVal: {
        lastName: '',
        firstName: '',
        patronymic: '',
        birthday: '',
        inn: '',
        passport: ''
      }
    }
  },
  methods: {    
    sendData: function () {
      this.step++
      const form = document.getElementsByClassName('form-user')
      // debugger
      console.log('Hi', form.fieldVal);
    },
    backStep: function () {
      this.step--
    }  
  }

}
</script>

<style>
  .form-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 600px;
  }

</style>  