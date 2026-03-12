import { Component } from '@angular/core';

/**
 * Swagger UI is served by the backend via springdoc-openapi.
 * Navigate to /swagger-ui.html or /swagger-ui/index.html on the backend.
 *
 * This component can embed it via an iframe if needed.
 */
@Component({
  selector: 'app-swagger',
  template: `
    <iframe
      src="http://localhost:8080/swagger-ui/index.html"
      style="width:100%; height:100vh; border:none;">
    </iframe>
  `
})
export class SwaggerComponent {}
