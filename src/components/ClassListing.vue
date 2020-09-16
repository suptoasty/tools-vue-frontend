<template>
    <v-card
    class="elevation-12 mb-4"
    height=150
    style="overflow: hidden"
    >
        <v-toolbar
        color="primary"
        dark
        flat
        >
            <v-toolbar-title @click="log('hello')"
            >
                <v-btn
                small
                text
                :ripple="false"
                link
                >
                    <v-icon style="font-style:normal">{{classObject.name}}</v-icon>
                </v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    small
                    text
                    fab
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Edit</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    small
                    text
                    fab
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </v-toolbar>
        <v-card-text>
            <p>{{classObject.description}}</p>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "ClassListing",

  props: {
      classObject: Object
  },
  data: () => ({
  }),
  methods: {
      log( message ) {
          console.log(message);
      }
  }
};
</script>