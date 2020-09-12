<template>
    <v-card class="elevation-12">
        <v-toolbar
        color="primary"
        dark
        flat
        >
        <v-toolbar-title>{{classObject.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-form>
                <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                ></v-text-field>

                <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "HelloWorld",

  props: {
      classObject: Object
  },
  data: () => ({
  })
};
</script>