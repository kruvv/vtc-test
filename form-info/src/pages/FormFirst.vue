<template>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <form class="mt-2 needs-validation"  @submit.prevent="onSubmit" novalidate>

        <div v-show="step === 1" class="step">
          <h2 class="mb-2 text-center">Введите данные для поиска</h2>
          <div class="form-user mb-3" v-for="field in fields" :key="field.id">
            <label :for="field.id" class="form-label">{{field.label}}</label>
            <input
              :type="field.type"
              :name="field.name"
              :id="field.id"
              :placeholder="field.placeholder"
              :maxlenght="field.maxlenght"
              class="form-control"
              v-model="field.name"
              required
            />
            <div class="invalid-feedback">
              Не заполнено поле {{field.label}}
            </div>
          </div>
          <input type="reset" name="" class="btn btn-outline-secondary col-sm-3 me-2 btn-sm" value="Очистить форму" />
          <input type="submit" name="" class="btn btn-outline-primary col-sm-3 btn-sm" value="Отправить" />
        </div>
      </form>
    </div>
    <div class="col-sm-8 mx-auto">
      <div v-show="step === 2" class="step">
          <h3 class="mb-2 text-center">Результат поиска</h3>
          <div class="meta" v-for="field in form.fields" :key="field.id">
            <div class="fw-bold">
              <small class="text-muted">{{field.label}}:&nbsp;</small>
              <small class="text-capitalize">{{field.name}}</small>
            </div>
          </div>
          <table class="table table-striped text-sm-start">
            <thead>
              <tr>
                <th>Проверка</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="el in institution" :key="el.name">

                  <td class="text-break"><small>{{el.name}}</small></td>
                  <td class="text-break"><small>{{el.res}}</small></td>

              </tr>
            </tbody>
          </table>
          <input type="button" name="" class="btn btn-outline-primary col-sm-2 btn-sm" value="Назад" @click="backStep"/>
        </div>
    </div>
  </div>
</template>

<script>
import { required } from '@vuelidate/validators'

export default {
  components: { },
  data () {
    return {
      form: {},
      step:1,
      fields: [
        {id: 'lastName', type: 'text', name: '', label: 'Фамилия', placeholder: 'Иванов'},
        {id: 'firstName', type: 'text', name: '', label: 'Имя', placeholder: 'Иван'},
        {id: 'patronymic', type: 'text', name: '', label: 'Отчество', placeholder: 'Иванович'},
        {id: 'birthday', type: 'date', name: '', label: 'Дата рождения'},
        {id: 'inn', type: 'text', name: '', label: 'ИНН', placeholder: '774301390154', maxlength: 12},
        {id: 'passport', type: 'text', name: '', label: 'Номер и серия паспорта', placeholder: '1236568799', maxlength: 10}
      ],
      institution: [
        {name:'Паспорта', res:'Запрос отправлен ...', url:'1'},
        {name:'ИНН', res:'Запрос отправлен ...', url:'2'},
        {name:'Исполнительных производств', res:'Запрос отправлен ...', url:'3'},
        {name:'Задолженностей по налогам и сборам', res:'Запрос отправлен ...', url:'4'},
        {name:'Перечня терристов и эстрмистов', res:'Запрос отправлен ...', url:'5'},
        {name:'Сведений о физических лицах, являющихся руководителями или учредителями(участниками) нескольких юридических лиц', res:'Запрос отправлен ...', url:'6'},
        {name:'Реестра дисквалифицированных лиц', res:'Запрос отправлен ...', url:'7'},
        {name:'Реестра уведомлений о залоге движимого имущества', res:'Запрос отправлен ...', url:'8'},
        {name:'Единого федерального реестра сведений о банкротстве', res:'Запрос отправлен ...', url:'9'},
        {name:'Реестра наследственных дел', res:'Запрос отправлен ...', url:'10'},
        {name:'В базах интерпол', res:'Запрос отправлен ...', url:'11'},
      ],
      status: {
        not_found: 'Не найдено',
        found: 'Обнаружено',
        unavailable: 'Сайт временно не доступен'
      }
    }
  },
  methods: {
    onSubmit: function () {
      this.step++
      this.form.fields = this.fields
      this.sendData(this.form)
    },

    sendData: function (form) {
      // fetch('https://jsonplaceholder.typicode.com/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(form),
      // }).then(response => {
      //     /* eslint-disable no-console */
      //     console.log('Response: ', response);
      //     /* eslint-enable no-console */
      // }).catch(error => {
      //     /* eslint-disable no-console */
      //     console.log(error);
      //     /* eslint-enable no-console */
      // })
      for (const el of this.institution) {
        console.log('url: ', el.url);
        setTimeout(() => {
          if (parseInt(el.url) % 2 === 0) {
            el.res = this.status.not_found
          } else if (parseInt(el.url) % 3 === 0) {
            el.res = this.status.found
          } else {
            el.res = this.status.unavailable
          }
        },1000)
      }

      // fetch('https://jsonplaceholder.typicode.com/users')
      // .then((response) => response.json())
      // .then((json) => console.log(json))

      console.log('Form', form);
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
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 600px; */
  }

</style>
