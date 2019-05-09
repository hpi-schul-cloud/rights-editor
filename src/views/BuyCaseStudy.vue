<template>
  <div>
    <div v-if="!user">
      <h2>Wer sind Sie</h2>
      <form action="">
        <ul>
          <li><input
            type="radio"
            name="role"
            value="Land"
            @click="user = 'Land'"
          > Land</li>
          <li><input
            type="radio"
            name="role"
            value="Kreis"
            @click="user = 'Kreis'"
          > Kreis</li>
          <li><input
            type="radio"
            name="role"
            value="Schule"
            @click="user = 'Schule'"
          > Schule</li>
          <li><input
            type="radio"
            name="role"
            value="Lehrer"
            @click="user = 'Lehrer'"
          > Lehrer</li>
          <li class="disabled"><input
            type="radio"
            name="role"
            value="Eltern"
            disabled
          > Eltern</li>
          <li class="disabled"><input
            type="radio"
            name="role"
            value="Schueler"
            disabled
          > Schüler</li>
        </ul>
      </form>
    </div>
    <div v-else>
      <p class="role-top" @click="user = null">Sie sind eingeloggt als: {{ user }}</p>

      <!-- TODO: only continue if role is eligible to continue with currently checked out media -->

      <div v-if="!temporal">
        <h2>Wie lange soll die Lizenz laufen?</h2>
        <form action="">
          <h3>Unbegrenzte Laufzeit</h3>
          <ul>
            <li><input
              type="radio"
              name="temporal"
              value="unlimited"
              @click="temporal = 'unbegrenzt'"
            > Unbegrenzte Laufzeit</li>
          </ul>
          <h3>Begrenzte Laufzeiten</h3>
          <ul>
            <li><input
              type="radio"
              name="temporal"
              value="10 years"
              @click="temporal = '10 Jahre'"
            > 10 Jahre</li>
            <li><input
              type="radio"
              name="temporal"
              value="7 years"
              @click="temporal = '7 Jahre'"
            > 7 Jahre</li>
            <li><input
              type="radio"
              name="temporal"
              value="48 hours"
              @click="temporal = '48 Stunden'"
            > 48 hours</li>
          </ul>
        </form>
      </div>
      <div v-else>
        <p class="chosen-option" @click="temporal = null">Gewählte Laufzeit der Lizenz: {{ temporal }}</p>

        <div v-if="!audience.chosen">
          <h2>Wem sollen die Inhalte zugänglich sein?</h2>
          <form action="">
            <ul>
              <li><input
                v-model="audience.teacher"
                type="checkbox"
                name="audience1"
                value="Lehrer"
              > Lehrer</li>
              <li><input
                v-model="audience.student"
                type="checkbox"
                name="audience2"
                value="Schueler"
              > Schüler</li>
              <li><input
                v-model="audience.parents"
                type="checkbox"
                name="audience3"
                value="Eltern"
              > Eltern</li>
            </ul>
            <button type="button" :disabled="!(audience.teacher || audience.student || audience.parents)" @click="audience.chosen = true">Auswahl speichern</button>
          </form>
        </div>

        <div v-else>
          <p class="chosen-option" @click="audience.chosen = false">
            Lizenzierte Nutzergruppe:
            <span v-if="audience.teacher">Lehrer<span v-if="audience.student || audience.parents">, </span></span>
            <span v-if="audience.student">Schüler<span v-if="audience.parents">, </span></span>
            <span v-if="audience.parents">Eltern</span>
          </p>

          <div v-if="!rights.chosen">
            <h2>Welche Rechte möchten Sie für die gewählte Nutzergruppe erwerben?</h2>
            <form action="">
              <ul>
                <li><input
                  v-model="rights.nc_public_display"
                  type="checkbox"
                  name="right1"
                  value="nc_public_display"
                > Recht auf nicht-gewerbliche öffentliche Vorführung</li>
                <li><input
                  v-model="rights.download"
                  type="checkbox"
                  name="right2"
                  value="download"
                > Recht auf Download </li>
                <li><input
                  v-model="rights.streaming"
                  type="checkbox"
                  name="right3"
                  value="streaming"
                > Recht auf Streaming</li>
                <li><input
                  v-model="rights.save"
                  type="checkbox"
                  name="right4"
                  value="save"
                > Recht zu speichern</li>
                <li><input
                  v-model="rights.intranet_access"
                  type="checkbox"
                  name="right5"
                  value="intranet_access"
                > Recht auf öffentliche Zugänglichmachung im Schulintranet</li>
                <li><input
                  v-model="rights.platform_access"
                  type="checkbox"
                  name="right6"
                  value="platform_access"
                > Recht auf öffentliche Zugänglichmachung in Lernplattformen</li>
                <li><input
                  v-model="rights.transform"
                  type="checkbox"
                  name="right7"
                  value="transform"
                > Recht auf technische Bearbeitung </li>
                <li><input
                  v-model="rights.editing"
                  type="checkbox"
                  name="right8"
                  value="editing"
                > Recht auf inhaltliche Bearbeitung</li>
                <li><input
                  v-model="rights.remix"
                  type="checkbox"
                  name="right9"
                  value="remix"
                > Recht auf Remix</li>
                <li><input
                  v-model="rights.distribute_derivate"
                  type="checkbox"
                  name="right10"
                  value="distribute_derivate"
                > Recht auf öffentliche Zugänglichmachung bearbeiteter Materialien</li>
                <li><input
                  v-model="rights.meta_creation"
                  type="checkbox"
                  name="right11"
                  value="meta_creation"
                > Recht auf Erstellung von Metabeschreibungen und Vorschaubildern</li>
              </ul>
              <button type="button" :disabled="!(rights.nc_public_display || rights.download || rights.streaming || rights.save || rights.intranet_access || rights.platform_access ||rights.transform || rights.editing || rights.remix || rights.distribute_derivate || rights.meta_creation)" @click="rights.chosen = true">Auswahl speichern</button>
            </form>
          </div>

          <div v-else>
            <p class="chosen-option" @click="rights.chosen = false">
              <pre>{{ rights }}</pre>
            </p>
            Prize: 4.000 EUR <button type="button" style="font-size: 25px; border-radius: 5px">=&gt; JETZT richtig absahnen!!! &lt;=</button>
          </div>
        </div>
      </div>
    </div>
  </div></template>

<script>

export default {
  name: 'BuyCaseStudy',
  data() {
    return {
      user: null,
      temporal: null,
      audience: {
        teacher: false,
        student: false,
        parents: false,
        chosen: false,
      },
      rights: {
        nc_public_display: false,
        download: false,
        streaming: false,
        save: false,
        intranet_access: false,
        platform_access: false,
        transform: false,
        editing: false,
        remix: false,
        distribute_derivate: false,
        meta_creation: false,
        chosen: false,
      },
    };
  },
};
</script>

<style scoped>
input[type="radio"] {
    vertical-align: bottom;
}
p {
    cursor: pointer;
    padding: 12px;
}
.role-top {
    background-color: rgb(215, 229, 238);
    cursor: pointer;
    padding: 12px;
    text-align: center;
}
.disabled {
    color: gray;
    font-style: italic;
}
.chosen-option {
    border-left: 2px solid black;
}
</style>
