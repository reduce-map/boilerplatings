---
to: "components/<%= h.changeCase.kebab(name) %>.vue"
---
<%
  const fileName = h.changeCase.kebab(name)
  const importName = h.changeCase.pascal(fileName)
  const titleName = h.changeCase.title(name)
%><template>
  <div class="<%= fileName %>"><%= titleName %></div>
</template>

<script>
export default {
  name: '<%= titleName %>',
}
</script>
<% if (useStyles) { %>
<style lang="scss" scoped></style>
<% } %>