<template> 
  <form class="form-user"  v-on:submit.prevent="sendData">
    <div class="mb-3" v-for="field in fields" :key="field.id">
      <label :for="field.id" class="form-label">{{field.name}}</label>
      <input 
        :type="field.type" 
        :name="field.name" 
        :id="field.id" 
        :placeholder="field.placeholder"
        :maxlenght="field.maxlenght" 
        class="form-control" 
      />  
    </div>
  <input type="submit" name="" class="btn btn-primary" value="Отправить" />
  </form>
        
      
</template>

<script>

export default {
  components: { },
  data () {
    return {
      fields: [
        {id: 'lastName', type: 'text', name: 'Фамилия', placeholder: 'Иванов'},
        {id: 'firstName', type: 'text', name: 'Имя', placeholder: 'Иван'},
        {id: 'patronymic', type: 'text', name: 'Отчество', placeholder: 'Иванович'},
        {id: 'birthday', type: 'date', name: 'Дата рождения'},
        {id: 'inn', type: 'text', name: 'ИНН', placeholder: '774301390154', maxlength: 12},
        {id: 'passport', type: 'text', name: 'Номер и серию паспорта', placeholder: '1236568799', maxlength: 10}
      ]
    }
  },
  methods: {
      sendData: function () {
        const form = document.getElementsByClassName('form-user')
        // debugger
        console.log('Hi', form);
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