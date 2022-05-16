<template>
  <div
    class="color-picker"
    :style="{
      backgroundColor: color.backgroundColor,
      color: color.color + ' !important',
    }"
  >
    <div>
      <v-select
        name="colorPicker"
        :options="colors"
        :clearable="false"
        :taggable="false"
        :pushTags="false"
        @input="onColorChanged"
        placeholder="Select color"
        :showDropDown="true"
        v-model="color"
        class="colors-select"
        label="name"
      >
        <template v-slot:selected-option="color">
          <span
            class="selected-color"
            :style="{
              backgroundColor: color.backgroundColor,
              color: color.color + ' !important',
            }"
          >
            {{ color.name }}
          </span>
        </template>

        <template v-slot:option="color">
          <span
            class="btn link-url color-option"
            :style="{
              backgroundColor: color.backgroundColor,
              color: color.color + ' !important',
            }"
          >
            {{ color.name }}
          </span>
        </template>
      </v-select>
    </div>
  </div>
</template>

<style lang="scss" src="./color-picker.scss"></style>
<script src="./color-picker.ts"></script>
