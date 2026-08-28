function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var subject = '💡 Nuevo mensaje desde Wild Ideas — ' + data.name;

    var body =
      'Nombre: ' + data.name + '\n' +
      'Email: ' + data.email + '\n\n' +
      'Mensaje:\n' + data.message + '\n\n' +
      '—\nEnviado desde el formulario de contacto de Wild Ideas';

    MailApp.sendEmail({
      to: 'wildideas.ok@gmail.com',
      subject: subject,
      body: body,
      replyTo: data.email
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
