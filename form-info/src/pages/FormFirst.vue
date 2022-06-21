<template>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <form class="mt-4"  @submit.prevent="sendData" novalidate>

        <div v-show="step===1" class="step">
          <h1 class="mb-4">Введите данные для поиска</h1>
          <div class=" form-user mb-3" v-for="field in fields" :key="field.id">
            <label :for="field.id" class="form-label">{{field.label}}</label>
            <input
              :type="field.type"
              :name="field.name"
              :id="field.id"
              :placeholder="field.placeholder"
              :maxlenght="field.maxlenght"
              class="form-control"
              v-model="field.name"
            />
          </div>
          <input type="submit" name="" class="btn btn-primary col-sm-3" value="Отправить" />
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
import { required } from '@vuelidate/validators'

export default {
  components: { },
  data () {
    return {
      step:1,
      fields: [
        {id: 'lastName', type: 'text', name: '', label: 'Фамилия', placeholder: 'Иванов'},
        {id: 'firstName', type: 'text', name: '', label: 'Имя', placeholder: 'Иван'},
        {id: 'patronymic', type: 'text', name: '', label: 'Отчество', placeholder: 'Иванович'},
        {id: 'birthday', type: 'date', name: '', label: 'Дата рождения'},
        {id: 'inn', type: 'text', name: '', label: 'ИНН', placeholder: '774301390154', maxlength: 12},
        {id: 'passport', type: 'text', name: '', label: 'Номер и серия паспорта', placeholder: '1236568799', maxlength: 10}
      ]
    }
  },
  methods: {
    sendData: function () {
      this.step++
      // const form = document.getElementsByClassName('form-user')
      let productReview = {
        name: this.fields.name,

      }
      this.name = null

      // debugger
      console.log('Hi', productReview.name);
    },
    backStep: function () {
      this.step--
    }
  },
  validations: {
    fields: {
        lastName: {required},
        firstName: {required},
        patronymic: {required},
        birthday: {required},
        inn: {required},
        passport: {required}
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
