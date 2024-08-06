---
to: src/components/templates/t-<%= name %>/index.js
---
import T<%= h.changeCase.pascalCase( name ) %> from './t-<%= name %>.vue'

export default T<%= h.changeCase.pascalCase( name ) %>
