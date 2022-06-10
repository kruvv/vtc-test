<template>
    <form class="form-user">
      <div class="mb-3">
        <label for="lastName" class="form-label">Фамилия</label>
        <input type="text" name="" class="form-control" id="lastName" />  
      </div>
       <div class="mb-3">
        <label for="firstName" class="form-label">Имя</label>
        <input type="text" name="" class="form-control" id="firstName" /> 
        </div>
         <div class="mb-3">
        <label for="patronymic" class="form-label">Отчество</label>
        <input type="text" name="" class="form-control" id="patronymic" /> 
        </div>
         <div class="mb-3">
        <label for="birthday" class="form-label">Дата рождения</label>
        <input type="date" name="" class="form-control" id="birthday" /> 
        </div> 
         <div class="mb-3">
        <label for="inn" class="form-label">ИНН</label>
        <input type="text" name="" class="form-control" id="inn" /> 
        </div> 
         <div class="mb-3">
        <label for="passport" class="form-label">Номер и серию паспорта</label>
        <input type="text" name="" class="form-control" id="passport" /> 
        </div>
        
        <input type="submit" name="" class="btn btn-primary" value="Отправить" />
    </form>    
</template>

<script>

export default {
  components: { }, 

}
</script>

<style>
  .form-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
  }

</style>  