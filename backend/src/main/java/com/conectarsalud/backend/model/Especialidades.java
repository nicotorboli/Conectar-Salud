package com.conectarsalud.backend.model;

public enum Especialidades {
    CARDIOLOGIA("Cardiología"),
    PEDIATRIA("Pediatría"),
    DERMATOLOGIA("Dermatología"),
    TRAUMATOLOGIA("Traumatología"),
    GINECOLOGIA("Ginecología"),
    MEDICOGENERAL("Medico General"),
    NEUROLOGIA("Neurología"),
    OFTALMOLOGIA("Oftalmología"),
    PSIQUIATRIA("Psiquiatría"),
    UROLOGIA("Urología"),
    ENDOCRINOLOGIA("Endocrinología"),
    GASTROENTEROLOGIA("Gastroenterología"),
    HEMATOLOGIA("Hematología"),
    NEFROLOGIA("Nefrología"),
    NEUMOLOGIA("Neumología"),
    ONCOLOGIA("Oncología"),
    REUMATOLOGIA("Reumatología"),
    ALERGOLOGIA("Alergología"),
    ANESTESIOLOGIA("Anestesiología"),
    CIRUGIA_GENERAL("Cirugía General"),
    CIRUGIA_PLASTICA("Cirugía Plástica"),
    MEDICINA_INTERNA("Medicina Interna"),
    MEDICINA_FAMILIAR("Medicina Familiar"),
    GERIATRIA("Geriatría"),
    INFECTOLOGIA("Infectología"),
    MEDICINA_EMERGENCIAS("Medicina de Emergencias"),
    RADIOLOGIA("Radiología"),
    MEDICINA_DEPORTIVA("Medicina Deportiva"),
    PATOLOGIA("Patología"),
    GENETICA_MEDICA("Genética Médica");

    private  String nombreDisplay;

    Especialidades(String nombreDisplay) {
        this.nombreDisplay = nombreDisplay;
    }

    public String getNombreDisplay() {
        return nombreDisplay;
    }

}
