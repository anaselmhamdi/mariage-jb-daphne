// Google Apps Script - RSVP Mariage
// À coller dans Extensions > Apps Script de votre Google Sheet
// Une ligne par invité

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var headers = [
      'Date',
      'Nom',
      'Prénom',
      'Adulte/Enfant',
      'Âge',
      'Menu',
      'Jours présents',
      'Régimes / Allergies',
      'Chorale',
      'Chorale - Qui',
      'Musicien(ne)',
      'Musicien - Qui',
      'Instrument',
      'Covoiturage',
      'Ville de départ',
      'Places dispo',
      'Baby-sitter',
      'Nb enfants à garder'
    ];

    // Ajouter les en-têtes si la première ligne est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }

    var date = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    var events = data.events ? data.events.join(', ') : '';
    var dietary = data.dietary || '';
    var chorale = data.chorale || '';
    var choraleQui = data.choraleQui || '';
    var musician = data.musician || '';
    var musicianQui = data.musicianQui || '';
    var instrument = data.instrument || '';
    var carpooling = data.carpooling || '';
    var ville = data.ville || '';
    var carpoolSeats = data.carpoolSeats || '';
    var babysitter = data.babysitter || '';
    var nbEnfantsGarde = data.nbEnfantsGarde || '';

    // Une ligne par invité
    if (data.guests && data.guests.length > 0) {
      data.guests.forEach(function(g) {
        sheet.appendRow([
          date,
          g.nom || '',
          g.prenom || '',
          g.type || '',
          g.age || '',
          g.menu || '',
          events,
          dietary,
          chorale,
          choraleQui,
          musician,
          musicianQui,
          instrument,
          carpooling,
          ville,
          carpoolSeats,
          babysitter,
          nbEnfantsGarde
        ]);
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test : ouvre l'URL du déploiement dans un navigateur
function doGet(e) {
  return ContentService
    .createTextOutput('Le script RSVP fonctionne correctement !')
    .setMimeType(ContentService.MimeType.TEXT);
}
