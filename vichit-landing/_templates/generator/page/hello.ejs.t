---
to: "pages/<%= h.changeCase.kebab(name) %>.vue"
---
<%
  const fileName = h.changeCase.kebab(name)
  const importName = h.changeCase.pascal(fileName)
  const titleName = h.changeCase.title(name)
%><template>
  <div class="app-page-indent"><%= titleName %></div>
</template>

<script>
export default {
  name: '<%= titleName %>',
  head() {
    /*
      return this.$setupHead('<%= fileName %>')
    */
  },
}
</script>
<% if (useStyles) { %>
<style lang="scss" scoped></style>
<% } %>