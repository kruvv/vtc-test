<template>
  <div class="row">
    <div class="col-sm-6 mx-auto">
      <form class="mt-2 needs-validation"  @submit.prevent="onSubmit" novalidate>

        <!-- Начало формы ввода данных поиска -->

        <div v-show="step === 1" class="step">
          <h2 class="mb-4 text-center">Введите данные для поиска</h2>
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
          <input type="submit" name="" class="btn btn-outline-primary col-sm-3 btn-sm float-end" value="Отправить" />
          <input type="reset" name="" class="btn btn-outline-secondary col-sm-3 me-2 btn-sm float-end" value="Очистить форму" />
        </div>
      </form>
    </div>

    <!-- Окончание формы ввода данных поиска -->



    <!-- Начало формы вывода данных поиска -->

    <div class="col-sm-8 mx-auto">
      <div v-show="step === 2" class="step">
          <h3 class="mb-2 text-center">Результат поиска</h3>
          <div class="meta mb-2">
            <div class="fw-bold" v-for="field in form.fields" :key="field.id">
              <small class="text-muted">{{field.label}}:&nbsp;</small>
              <small class="text-capitalize">{{field.name}}</small>
            </div>
          </div>


          <!-- Начало блока отображения каптчи -->
            <div v-if="listCaptchas.length > 0">
              <div class="row row-cols-1 row-cols-md-2 g-4 mb-3" >
                <div class="col" v-for="el of listCaptchas" :key="el.id">
                  <form class="card" @submit.prevent="sendCaptcha">
                    <img :src="el.src" class="card-img-top" alt="captcha">
                    <div class="card-body">
                      <h5 class="card-title">Card title: {{el.data.id}}</h5>
                      <div class="row g-2">
                        <input
                          type="text"
                          :name="el.name"
                          :id="el.data.id"
                          class="form-control"
                          v-model="el.name"
                          required
                        />
                        <input 
                          type="submit" 
                          name="" 
                          class="btn btn-outline-primary col-auto btn-sm float-end" 
                          value="Отправить" 
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          <!-- Окончание блока отображения каптчи --> 


          <!-- Начало блока отображения таблицы запросов -->
          <table class="table table-striped text-sm-start mt-2 mb-3">
            <thead>
              <tr>
                <th>Проверка</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="el of institution" :key="el.name">
                <template v-if="el.res === 'Обнаружено'">
                  <td class="text-break table-danger">
                      <small>{{el.name}}</small>
                      <template v-if="el.msg.length > 0">
                        <small>. Найдено {{el.msg.length}}</small>
                        <div v-for="item of el.msg" :key="item.id">
                          <div class="accordion" :id="item.id">
                            <div class="accordion-item">
                              <h2 class="accordion-header" id="headingOne">
                                <button @click="openClose"  class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  {{item.title}}
                                </button>
                              </h2>
                              <div  id="collapseOne" :class="`accordion-collapse collapse ${item.showEl}`" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                      <strong>This is the item's accordion body.</strong> 
                                        It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                              </div>
                            </div>
                          </div>
                          <!-- <small class="text-muted">{{item}}</small>   -->
                        </div>  
                      </template>              
                  </td>
                  <td class="text-break table-danger"><small>{{el.res}}</small></td>
                </template>
                <template v-else-if="el.res === 'Сайт временно не доступен'">
                  <td class="text-break table-warning"><small>{{el.name}}</small></td>
                  <td class="text-break table-warning"><small>{{el.res}}</small></td>
                </template>
                <template v-else-if="el.res === 'Не найдено'">
                  <td class="text-break table-success"><small>{{el.name}}</small></td>
                  <td class="text-break table-success"><small>{{el.res}}</small></td>
                </template>
                <template v-else>
                  <!-- <div> -->
                    <td class="text-break"><small>{{el.name}}</small></td>
                    <td class="text-break">
                      <small>{{el.res}}</small>
                      <div class="text-center">
                        <div class="spinner-border text-primary spinner-border-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div> 
                      </div>                     
                    </td>
                  <!-- </div> -->
                  <!-- <div>There's a captcha here</div> -->
                </template>
              </tr>
            </tbody>
          </table>

          <!-- Окончание блока отображения таблицы запросов -->

          <p class="fw-bold criminal">{{criminalAndAdministrativeResponsibility}}</p>
          <p class="not-director">{{notDirector}}</p>
          <p class="compromising-data">{{compromisingData}}</p>
          <p class="text-danger recommendation">{{recommendation}}</p>  

          <!-- <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px"></textarea>
            <label for="floatingTextarea">Рекомендации</label>
          </div>         -->

          <input type="button" name="" class="btn btn-outline-primary col-sm-2 btn-sm float-end" value="Назад" @click="backStep"/>
        </div>
    </div>
  </div>
  <!-- Окончание формы вывода данных поиска -->
</template>

<script>
import { required } from '@vuelidate/validators'

export default {
  components: { },
  data () {
    return {
      form: {},
      listCaptchas: [],
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
        {name:'Паспорта', res:'', formId:'1', msg: []},
        {name:'ИНН', res:'', formId:'2', msg: []},
        {name:'Исполнительных производств', res:'', formId:'3', msg: [{id:1, title:'Какя-то хрень 1', showEl: ''}, {id:2, title:'Какая-то хрень 2', showEl: ''}]},
        {name:'Задолженностей по налогам и сборам', res:'', formId:'4', msg: []},
        {name:'Перечня терристов и эстрмистов', res:'', formId:'5', msg: []},
        {name:'Сведений о физических лицах, являющихся руководителями или учредителями(участниками) нескольких юридических лиц', res:'', formId:'6', msg: []},
        {name:'Реестра дисквалифицированных лиц', res:'', formId:'7', msg: []},
        {name:'Реестра уведомлений о залоге движимого имущества', res:'', formId:'8', msg: []},
        {name:'Единого федерального реестра сведений о банкротстве', res:'', formId:'9', msg: []},
        {name:'Реестра наследственных дел', res:'', formId:'10', msg: []},
        {name:'В базах интерпол', res:'', formId:'11', msg: []},
      ],
      status: {
        not_found: 'Не найдено',
        found: 'Обнаружено',
        unavailable: 'Сайт временно не доступен',

      },
      compromisingData: 'Компрометирующей информации в сети Интернет не обнаружено.',
      recommendation: 'Не рекомендован для назначения на должности руководящего состава, назначения ответственным лицом при получении ТМЦ компании, получения в управление транспортных средств и оборудования организации.',
      notDirector: 'Не является(лся) руководителем/учредителем в коммерческих организациях.',
      criminalAndAdministrativeResponsibility: 'К уголовной и административной ответственности на территории РФ не привлекался.',

      
    }
  },
  methods: {
    onSubmit() {
      this.step++
      this.form.fields = this.fields
      this.sendData(this.form)
    },

    openClose: function (e) {
      console.log('event: ', e);
      this.showEl = 'show'
    },

    sendData(d) {
      const user = {}
      for (const el of d.fields) {
        switch(el.label) {
          case 'Фамилия' : user.lastName = el.name; break;
          case 'Имя' : user.firstName = el.name; break;
          case 'Отчество' : user.patronymic = el.name; break;
          case 'Дата рождения' : user.birthday = el.name; break;
          case 'ИНН' : user.inn = el.name; break;
          case 'Номер и серия паспорта' : user.passport = el.name; break;
          default: console.error(`Проверте названия полей формы, не определено поле *** ${el.label} ***`); break;
        }
      }

      // let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

      // socket.onopen = function(event) {
      //   console.log("[event] ",  event);
      //   // alert("[open] Соединение установлено");
      //   // alert("Отправляем данные на сервер");
      //   socket.send("Меня зовут Джон");
      //   // socket.send(JSON.stringify(user));
      // };

      // socket.onmessage = function(event) {
      //   console.log("[message] ",  event);
      //   // alert(`[message] Данные получены с сервера: ${event.data}`);
      // };

      // socket.onclose = function(event) {
      //   if (event.wasClean) {
      //     // alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
      //   } else {
      //     // например, сервер убил процесс или сеть недоступна
      //     // обычно в этом случае event.code 1006
      //     // alert('[close] Соединение прервано');
      //   }
      // };

      // socket.onerror = function(error) {
      //   alert(`[error] ${error.message}`);
      // };

      console.log('user: ', user);
      
      for (const el of this.institution) {
        // console.log('url: ', el.url);
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

      // console.log('Form', form);
      //const res = {type:'form', form}

      let base64="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"
      //let base64="iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      setTimeout(()=>{
        this.onGetData({type:'captcha', blob:base64, id:'1'})
      },3000)

      // setTimeout(()=>{
      //   this.onGetData({type:'result', status:1, messages:[{text: 'неверно'}], id:'1'})
      // },6000)
      setTimeout(()=>{
        this.onGetData({type:'captcha', blob:base64, id:'1234'})
      },2000)
      setTimeout(()=>{
        this.onGetData({type:'captcha', blob:base64, id:'12345'})
      },2000)
      setTimeout(()=>{
        this.onGetData({type:'captcha', blob:base64, id:'123456'})
      },1000)

      for (let i = 0; i < 12; i++) {
        let random = Math.floor(Math.random() * 3)
        setTimeout(()=>{
          this.onGetData({type:'result', status:random, messages:[{text: 'неверно'}], id:i})
          console.log({type:'result', status:random, messages:[{text: 'неверно'}], id:i});
        }, parseInt(random + '000'))
      }
    },

    sendCaptcha(e) {
      const event = e.target[0]
      console.log('[Отправил капчу]', {val: event.value, captchaId: event.id});
      // console.log('[Отправил капчу]', e);
      this.listCaptchas = this.listCaptchas.filter(e => e.data.id !== event.id)
    },

    onGetData(data) {
      const obj = {}
      if (data.type == 'captcha') {        
        const base64 = data.blob
        let buffer=Uint8Array.from(atob(base64), c => c.charCodeAt(0));
        let blob=new Blob([buffer], { type: "image/jpeg" });
        let url=URL.createObjectURL(blob);
        // let img=document.createElement("img");
        // img.src=url;
        // document.body.appendChild(img);
        obj.data = data
        obj.src = url
      }

      if (data.type == 'result') {
        const id = data.id
        for (let el of this.institution) {
          if (id === parseInt(el.formId)) {
            el.msg = data.messages            
            switch(data.status) {
              case 0 : el.res = this.status.not_found; break;
              case 1 : el.res = this.status.found; break;
              case 2 : el.res = this.status.unavailable; break;
              // case 3 : el.res = this.status.unavailable; break;
            }
          }
          console.log('el: ', el);
        }
        // data.status = 
        // 0 - ok 1 - не ok 2 - error
        // data.message - 
      }

      if (data.type == 'captcha') this.listCaptchas.push(obj)

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

  .criminal,
  .compromising-data,
  .not-director,
  .recommendation {
    text-indent: 20px;
  }

</style>
