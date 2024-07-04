import React from 'react';

const Actividades = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Agrega aquí la lógica para manejar el envío del formulario
  };

  return (
    <div className="container">
      <h1>Gestión de Actividades</h1>

      {/* Sección para estudiantes */}
      <div id="student-section">
        <h2>Mis Actividades</h2>
        <form id="upload-activity-form" action="/activities/upload" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="activity-file">Subir Actividad</label>
            <input type="file" className="form-control-file" id="activity-file" name="activity-file" required />
          </div>
          <button type="submit" className="btn btn-primary">Enviar Actividad</button>
        </form>

        <h2>Actividades Enviadas</h2>
        <table
          id="student-activity-table"
          data-toggle="table"
          data-search="true"
          data-filter-control="true"
          data-show-export="true"
          data-click-to-select="true"
          data-toolbar="#toolbar"
          className="table-responsive"
        >
          <thead>
            <tr>
              <th data-field="id_actividad" data-visible="false"></th>
              <th data-field="nombre_actividad">Nombre de la Actividad</th>
              <th data-field="fecha_envio">Fecha de Envío</th>
              <th data-field="calificacion">Calificación</th>
              <th data-field="retroalimentacion">Retroalimentación</th>
              <th data-field="acciones" data-formatter="studentActivityActionFormatter">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Datos de las actividades del estudiante */}
          </tbody>
        </table>
      </div>

      {/* Sección para docentes */}
      <div id="teacher-section">
        <h2>Actividades de Estudiantes</h2>
        <table
          id="teacher-activity-table"
          data-toggle="table"
          data-search="true"
          data-filter-control="true"
          data-show-export="true"
          data-click-to-select="true"
          data-toolbar="#toolbar"
          className="table-responsive"
        >
          <thead>
            <tr>
              <th data-field="id_actividad" data-visible="false"></th>
              <th data-field="nombre_estudiante">Estudiante</th>
              <th data-field="nombre_actividad">Nombre de la Actividad</th>
              <th data-field="fecha_envio">Fecha de Envío</th>
              <th data-field="calificacion">Calificación</th>
              <th data-field="retroalimentacion">Retroalimentación</th>
              <th data-field="acciones" data-formatter="teacherActivityActionFormatter">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Datos de las actividades de los estudiantes */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Actividades;
