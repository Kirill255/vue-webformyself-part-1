<template>
  <div class="col-md-6">
    <h2>Form</h2>
    <form @submit.prevent="sendForm">
      <!-- email -->
      <div class="form-group mb-3">
        <label for="Email">Email</label>
        <input id="Email"
               type="text"
               class="form-control"
               :class="{'is-invalid': $v.email.$error }"
               placeholder="Email"
               v-model="email"
               @input="$v.email.$touch()"
               required>

        <div v-if="!$v.email.required"
             class="invalid-feedback">
          Email is required.
        </div>
        <div v-if="!$v.email.email"
             class="invalid-feedback">
          Email must be a valid email adress.
        </div>
        <div v-if="!$v.email.uniqueEmail"
             class="invalid-feedback">
          This email is already exists.
        </div>
      </div>

      <!-- password -->
      <div class="form-group mb-3">
        <label for="Password">Password</label>
        <input id="Password"
               type="password"
               class="form-control"
               :class="{'is-invalid': $v.password.$error }"
               placeholder="Password"
               v-model="password"
               @input="$v.password.$touch()"
               required>

        <div v-if="!$v.password.required"
             class="invalid-feedback">
          Password is required.
        </div>
        <div v-if="!$v.password.minLength"
             class="invalid-feedback">
          Min lentgth of password is {{ $v.password.$params.minLength.min }}. Now it's {{ password.length }}
        </div>
      </div>

      <!-- confirm password -->
      <div class="form-group mb-3">
        <label for="Confirm">Confirm Password</label>
        <input id="Confirm"
               type="password"
               class="form-control"
               :class="{'is-invalid': $v.confirmPasword.$error }"
               placeholder="Confirm Password"
               v-model="confirmPasword"
               @input="$v.confirmPasword.$touch()"
               required>

        <div v-if="!$v.confirmPasword.sameAs"
             class="invalid-feedback">
          Password should match.
        </div>
      </div>

      <button type="submit"
              class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "MyForm",
  data: () => ({
    email: "",
    password: "",
    confirmPasword: ""
  }),
  validations: {
    email: {
      required,
      email,
      // наш собственный валидатор
      // тут именно такая функция иначе у нас this будет ссылаться на валидатор, а не на instance Vue
      uniqueEmail: function(newEmail) {
        // тут мы должны сделать запрос в базу, и проверить существует ли такой email "newEmail", если существует, то вернуть false, если нет, то вернуть true
        // для примера сейчас стоит просто заглушка

        if (newEmail === "") return true; // эта проверка нужна чтобы валидтор(required) не ждал пока валидатор(uniqueEmail) сходит в базу

        // мы идём в базу только если email - это валидный email
        if (this.$v.email.email) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const value = newEmail !== "test@mail.ru"; // value будет равно true или false
              resolve(value);
            }, 3000);
          });
        } else {
          return true;
        }
      }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPasword: {
      // sameAs: sameAs("password")
      sameAs: sameAs(vue => {
        // метод с функцией нужен если у нас вложенное поле, например form: {password: ""}
        return vue.password; // тогда тут было бы vue.form.password
      })
    }
  },
  methods: {
    sendForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("Send");
        console.log(`${this.email} ${this.password}`);
      } else {
        console.log("Fill the form");
      }
    }
  }
};
</script>

<style scoped>
</style>

/*
Метод $touch() лучше вешать не на событие input `@input="$v.email.$touch()"`, а на событие blur `@blur="$v.email.$touch()"`,
так как оно вызывается только после потери фокуса, а не при каждом вводе, хотя делать надо как вам нужно в данный момент
*/
