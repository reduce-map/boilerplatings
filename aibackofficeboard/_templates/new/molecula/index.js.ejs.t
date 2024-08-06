---
to: src/components/molecules/m-<%= name %>/index.js
---
import M<%= h.changeCase.pascalCase( name ) %> from './m-<%= name %>.vue'

export default M<%= h.changeCase.pascalCase( name ) %>
