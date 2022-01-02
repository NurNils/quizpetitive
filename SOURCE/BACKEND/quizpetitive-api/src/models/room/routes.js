const KEY = process.env.ROUTE_ROOM;
const ROOM = require('./room');
const QUESTION = require('../question/question');

module.exports = (app) => {
    const questionsToImport = [
        {
            "category": "Initialisierung",
            "question": "Was ist ein Stakeholder?",
            "answers": ["Jemand der ein Steak hält",
            "Personen die die Zielrichtung beeinflussen",
            "Ein BBQ Profi",
            "Personen die sich um Finanzen bei Projekten kümmern"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Welcher Bereich gehört nicht zur Finanzplanung?",
            "answers": ["Erträge des Projekts",
            "Planen der Zahlungstermine",
            "Beschaffung der Finanziellen Mittel",
            "Liquiditätsüberwachung"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Initialisierung",
            "question": "Was ist keine Art von Finanzierung?",
            "answers": ["Eigenfinanzierung ",
            "Umschichtungsfinanzierung ",
            "Fremdfinanzierung ",
            "Schichtungsfinanzierung"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Was sind keine zu analysierende Risiken der Projektfinanzierung?",
            "answers": ["Sicherheit des Kapitals",
            "Ausfall der Kapitalgeber",
            "Währungskursrisiken",
            "Ausfall von Projektträgern"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Initialisierung",
            "question": "Was muss bei der Terminplanung nicht berücksichtigt werden?",
            "answers": ["Urlaubstage",
            "Feiertage",
            "Krankheitsbedingte Fehlzeiten",
            "Kündigungen"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Was gehört nicht zu den Smarten Zielkriterien?",
            "answers": ["Spezifisch",
            "Attraktiv",
            "Messbar",
            "Terminierung"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Was sind keine Finanzmittel?",
            "answers": ["Kredite",
            "Kapital der Projektträger",
            "Fördermittel des öff. Sektors",
            "Honorarzahlungen"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Was ist ein Erfolgsfaktor für Stakeholdermanagement?",
            "answers": ["Kontrolle",
            "Konsultation",
            "Konditionierung ",
            "Finanzen"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Beim Stakeholdermanagement gehören Wettbewerber zu welchem Umfeld?",
            "answers": ["Primär",
            "Sekundär",
            "Beiden",
            "Keinen"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Initialisierung",
            "question": "Wer kann Projekte Finanzieren?",
            "answers": ["Shareholder",
            "Auftraggeber ",
            "Shareholder oder Auftraggeber",
            "Shareholder & Auftraggeber"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Wie sollte man Zeitpuffer einsetzen?",
            "answers": ["Großzügig",
            "Am Ende einer Kette",
            "Zwischendurch immer wieder",
            "Antwort 2 & 3"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Wer ist Verantwortlich für die Ziele?",
            "answers": ["Auftraggeber",
            "Projektleitung ",
            "Projektleitung & Management",
            "Management"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Initialisierung",
            "question": "Konsultation bedeutet?",
            "answers": ["Stakeholder informieren",
            "Stakeholder involvieren",
            "Stakeholder nicht informieren",
            "Stakeholder nicht involvieren"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Beim Stakeholdermanagement gehören Berater zu welchem Umfeld?",
            "answers": ["Primär",
            "Sekundär",
            "Beiden",
            "Keinen"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Während des Projekts werden Erträge erzielt, diese gehören zur?",
            "answers": ["Eigenfinanzierung ",
            "Schichtungsfinanzierung",
            "Umschichtungsfinanzierung ",
            "Fremdfinanzierung "],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Initialisierung",
            "question": "Wer ist für die Zahlungsfähigkeit des Projekts verantwortlich?",
            "answers": ["Die Shareholder",
            "Immer der Projektmanager",
            "Der Auftraggeber",
            "Meistens der Projektmanager"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Eine kleine Verzögerung auf dem kritischen Pfad geschieht. Was bedeutet das für das Projekt?",
            "answers": ["Da Puffer das ist passiert nichts",
            "Das Projekt verzögert sich",
            "Ein anderer Pfad verzögert sich",
            "Alle Pfade verzögern sich"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Beim Dreieck des PM (Time,Cost,Quality) sind welche die Wichtigsten",
            "answers": ["Time & Cost",
            "Keine der anderen",
            "Quality & Cost",
            "Cost & Quality"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Initialisierung",
            "question": "Sollte man qualifizierten Mitarbeitern einfache Aufgaben geben, damit diese schneller erledigt sind?",
            "answers": ["Ja, wegen des Flow Effects",
            "Nein, wegen der Ressourcen",
            "Nein, wegen des Flow Effects",
            "Ja, wegen der Ressourcen"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Initialisierung",
            "question": "Mit welchem Begriff verbindet man Durchbruchsziele?",
            "answers": ["Attraktiv",
            "Terminiert",
            "Spezifisch",
            "Realistisch"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Initialisierung",
            "question": "Was zeichnet einen guten Projektmanager aus beim Stakeholdermanagement?",
            "answers": ["Geht Stakeholdern(SH) aus dem Weg ",
            "Geht auf die Emotionen der SH ein",
            "Versteht die SH-Empathie",
            "Die Position der SH verstehen"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Analyse",
            "question": "Die Auswirkungen die man sich von einem Projekt erhofft heißt?",
            "answers": ["Outcomes",
            "Incomes",
            "Effects",
            "Wins"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Der messbaren Effekte eines Projekts heißen?",
            "answers": ["Effects",
            "Objectives",
            "Results",
            "Measurables"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Was beschreiben die in einem Projekt enthaltenen Nutzer, geografischen Grenzen und die Art der Arbeit?",
            "answers": ["Resources",
            "SMART",
            "Scope",
            "Count"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Analyse",
            "question": "Was ist die Goldene Regel von Projektmanagement?",
            "answers": ["Ansteuerung | Plan | Organisation",
            "Planung | Organisation | Steuerung",
            "Optimierung | Gewinn | Schnelligkeit",
            "Transparenz | Planung | Organe"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Welche Begriffe gehören nicht zur Leistungsbeschreibung?",
            "answers": ["Teamarbeit | Feedback | Zielsetzung",
            "Hintergrundwissen | Zielsetzung | Geltungsbereich",
            "Einschränkungen | Annahmen | Berichterstattung",
            "Ergebnisse und Meilensteine | Kosten-Nutzen-Verhältnis | Finanzen"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Was ist eines der wichtigsten Aspekte für einen Zeitplan?",
            "answers": ["Der Zeitplan hat keine konkreten Meilensteine",
            "Die Erstellung des Zeitplans durch den Projektleiter alleine",
            "Die strikte Einhaltung des Zeitplans",
            "Die Kommunikation des Zeitplans"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Analyse",
            "question": "Wie viel Zeit benötigt es die Zeile und Anforderungen des Kunden einzuholen?",
            "answers": ["55%",
            "70%",
            "40%",
            "80%"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Analyse",
            "question": "Wie werden die Dinge genannt, die nicht behandelt werden?",
            "answers": ["Not considered  | Nicht betrachtet",
            "Ignored |Ignoriert",
            "Exclusions | Ausschlüsse",
            "Inclusions | Einschlüsse"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Analyse",
            "question": "Welche 2 sind mögliche Funktionale Ziele",
            "answers": ["Bedienungsfreundlichkeit und Zuverlässigkeit",
            "Sicherheit und Arbeitssicherung",
            "Größerer Durchsatz und Größerer Umsatz",
            "Mitarbeiterzuverlässigkeit und Design"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Was ist ein PM-Handbuch?",
            "answers": ["Ein PM-Handbuch ist identisch mit dem Projekthandbuch",
            "Eine Regelung, für einheitliche Vorgehensweise für Projektplanung und –Durchführung",
            "Ein PM-Handbuch enthält die detaillierte Planung eines Projekts",
            "Ein PM-Handbuch enthält den Terminplan und den Kostenplan eines Projekts"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Um was erweitert CCPM das klassische Projektmanagement?",
            "answers": ["Vermeidung von schädlichem Multitasking",
            "Eine korrekte Dokumentation",
            "Einführungen einer Fehleranalyse",
            "Vermeidung von Kostenfallen"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Was sind messbare Effekte, also Objectives eines Projekts?",
            "answers": ["Die erwarteten Liefergegenstände und deren Gesamtkosten",
            "Die Risiken und Nebenwirkungen",
            "Durch das Projekt entstandene Ideen",
            "Der Gewinn, den das Projekt erzielt"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Bei welcher dieser Beziehungen handelt es sich um eine bidirektionale?",
            "answers": ["Vertrag",
            "Angebot",
            "Anfrage",
            "Lastenheft"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Was beschreibt die IRS (interne Referenz Spezifikation)?",
            "answers": ["Das interne Ressourcenmanagement",
            "Die Details zur Realisierung, welche aus dem ERS hervorgehen",
            "Die interne Bewertung des Produkts",
            "Details zur Erstellung eines internen Zeitplans"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Welchen zweck hat ein Projekttagebuch?",
            "answers": ["Das Projekttagebuch dient als Kommunikationsmittel zwischen Teammitgliedern",
            "Das Projekttagebuch dient als einheitliche Projektdokumentation",
            "Das Projekttagebuch ist eine individuelle Projektdokumentation",
            "Das Projekttagebuch ist die Milestonedokumentation der Teammitglieder"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Auf welche Faktoren können sich Risiken nicht auswirken?",
            "answers": ["Finanzen",
            "Qualität",
            "Kosten",
            "Zeit"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Wann ist der Planungsprozess zu Ende?",
            "answers": ["Beim Beginn der Durchführung des Projekts",
            "Ein kontinuierlicher Prozess der die gesamte Durchführung des Projekts begleitet",
            "Die Planung ist beendet sobald es den ersten Prototypen des Projekts gibt",
            "Sobald die Verbesserung nur noch geringe Erfolge erzielt"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Zu welchem Zweck wird die Portfolioanalyse im Zusammenhang mit Projekten eingesetzt?",
            "answers": ["Sie ist ein Hilfsmittel um die Risiken in einem Projekt besser einschätzen zu können",
            "Eine Portfolioanalyse untersucht und vergleicht Projekte anhand festgelegter Kriterien",
            "Sie untersucht, welche Finanzmittel für Projekte zur Verfügung stehen",
            "Die Portfolioanalyse ist kein Instrument des strategischen Managements"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Für was ist der Projektstrukturplan nötig?",
            "answers": ["Als elementares Grundlage der Kundenbindung",
            "Die PSP hat keine Auswirkungen auf das Risikomanagement",
            "Um das Projekt im nachhinein sauber zu Dokumentieren",
            "Als Grundlage für Termin-,  Ablauf-,  Ressourcen- und Kostenplanung"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Analyse",
            "question": "Was beschreibt die ERS (extern Referenz Spezifikation)?",
            "answers": ["Die Projektbeschreibung ein Außenstehenden",
            "Die Steuerung des Projekts durch einen Außenstehenden",
            "Das zu erstellende Produkt von der Anwenderseite",
            "Die externe Bewertung des Produkts"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Analyse",
            "question": "Was schafft die Risikoanalyse als neben Ziel?",
            "answers": ["Die Kosten des Projekts zu senken",
            "Die Qualitätsverbesserung der Zusammenarbeit",
            "Einen Entscheidungsprozess zu optimieren und zu objektivieren",
            "Die Erfahrung des Teams zu steigern"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Analyse",
            "question": "Was beinhaltet Qualitative Risikoanalyse und Bewertung?",
            "answers": ["Risikokennzahlen und Kosten",
            "Brainstorming und Gruppendiskussion",
            "Änderung der Projektziele und Inhalte",
            "Keine Akzeptanz gegenüber strategisch unbedeutenden Risiken"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Analyse",
            "question": "Können Krankheit und Urlaub zu Auslastungsrisiken gezählt werden?",
            "answers": ["Nur die Krankheit",
            "Ja, Krankheit und Urlaubsplanung",
            "Nur aufgrund von der Urlaubsplanung",
            "Nein es liegt nicht an Krankheit oder Urlaubsplanung"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Analyse",
            "question": "Wie kann ein PM-Overkill verhindert werden?",
            "answers": ["In dem der Projektmanager seine aufgaben mit einer guten Dosierung verteilt",
            "Durch den Einsatz von qualitativer Risikoanalyse",
            "Durch eine simple Projektmanager Hirachiestruktur",
            "Durch dosierten Einsatz von Methoden der Projektplanung"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Analyse",
            "question": "Was steht für die PM-Kultur und warum ist sie so wichtig?",
            "answers": ["Eine gute Teamfähigkeit mit der gesamten Projektgruppe für bessere Teamarbeit",
            "Die Anwendung aller PM-Tools und der daraus reflektierende Projekterfolg",
            "Die klassische Projektmanager Hierarchie ist wichtig für eine gute Projektleitung",
            "Für den Erfolg des Projekts wenn eine gute PM-Kultur geschaffen werden kann"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Konzeption",
            "question": "Wie weit muss die Verständlichkeit des Konzepts reichen?",
            "answers": ["Außenstehende",
            "Osterrieder",
            "Projektteam",
            "Sponsoren"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Wie beginnt man ein Konzept?",
            "answers": ["Erfolgskontrolle",
            "Abstract",
            "Bewertung",
            "Zielsetzung"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Was ist bei der Konzeption zu beachten?",
            "answers": ["Keine absurden Ideen berücksichtigen",
            "Wenig bis gar nicht kommunizieren",
            "viel Freiraum und neue Ideen zulassen",
            "Strikt nach der Grundidee vorgehen"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Wie formuliert man die Zielsetzung im Konzept?",
            "answers": ["BMW",
            "AUDI",
            "MINI",
            "SMART"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Konzeption",
            "question": "Welcher dieser Begriffe gehört nicht zu SMART?",
            "answers": ["Managable",
            "Specific",
            "Achievable",
            "Time-Bound"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Welchen Strukturbestandteil gibt es in einem Konzept nicht?",
            "answers": ["Situationsbeschreibung",
            "Zeitliche Orientierung",
            "Ressourcenplanung",
            "Strategische Elemente"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Welche besonderen Kompetenz benötigt ein Konzeptentwickler nicht?",
            "answers": ["Methodik",
            "Kommunikation",
            "Präsentation",
            "Management"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Konzeption",
            "question": "Welches Kernproblem kann beim Konzept schreiben auftreten?",
            "answers": ["Zeitaufwand unterschätzen",
            "Falsche Schriftgröße",
            "Zu viel kommunizieren",
            "Zu wenig Feedback eingeholt"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Was ist nicht wichtig für das Naming?",
            "answers": ["Domainverfügbarkeit",
            "Keine Spezifikation",
            "Hinweis auf Produkt",
            "Keine negativen Assoziationen"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Welche Definition beschreibt den Auslöser für Aktivitäten?",
            "answers": ["Klare Struktur und Handlungsbeschreibungen",
            "Grund für die Durchführung vom Projekt",
            "Klare Strategien und Handlungsempfehlungen",
            "Klare Definition der Grundidee"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Welche der Bewertungskriterien gehört nicht dazu?",
            "answers": ["Nutzwertanalyse",
            "Ideenqualität",
            "Argumentationsbilanz",
            "Kostenvergleichsrechnung"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Welche Frage ist irrelevant für den Konzeptentwickler?",
            "answers": ["Was wird benötigt?",
            "Wie genau?",
            "Wozu wird das Projekt umgesetzt?",
            "Habe ich das richtig verstanden, dass?"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Für was ist der Scrum Master zuständig?",
            "answers": ["Arbeitet im Entwicklungsteam",
            "Ist eine führende Kraft",
            "Die Verbreitung der Projektidee",
            "..., dass Scrum als Rahmenwerk gelingt"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Konzeption",
            "question": "Was ist eine Gemeinsamkeit von Scrum und Kanban?",
            "answers": ["Durchlaufgeschwindigkeit von Aufgaben soll optimiert werden",
            "Die Vorgehensweise ist evolutionär",
            "Beide basieren auf Inspektion und Adaption",
            "Regeln und Rollen können sich auf einen Schlag ändern"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Wer ist für die Koordination des Teams verantwortlich?",
            "answers": ["Projektmanager",
            "Projektleiter",
            "Projektmanager & Projektleiter",
            "Mitarbeiter"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Was ist keine Eigenschaft agiler Methoden?",
            "answers": ["Der Kunde bewertet Zwischenergebnisse",
            "Große Teams sind möglich",
            "Später Anforderungsänderungen verursachen mäßige Kosten",
            "Aufgaben werden selbständig übernommen"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Was ist der Vorteil des klassischen Projektmanagements?",
            "answers": ["Der Entwicklungsprozess ist Iterativ",
            "Die Anforderungen sind von Beginn an klar",
            "Es gibt eine fortlaufende Prozessverbesserung",
            "Anforderungsänderungen sind eingeplant"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Welche der Aussagen entspricht nicht der Wahrheit?",
            "answers": ["Projektmanager hat die Verantwortung über das Projekt",
            "Auftraggeber vertritt die Projektinteressen nach außen",
            "Auftraggeber entscheidet über das Finanzielle",
            "Projektmanager hat die Macht über das Projekt"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Konzeption",
            "question": "Welche Aussage entspricht der Einleitung des Konzepts?",
            "answers": ["Abstract, Zusammenfassung, um Interesse zu wecken",
            "Prolog, Auflistung der Ziele",
            "Prolog, Ausführliche Einleitung in das Konzept",
            "Prolog, Ausführliche Einleitung in das Konzept"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Welche Aufgaben wurden falsch zugeteilt?",
            "answers": ["Auftraggeber liegt Ziele und Prioritäten mit PM fest",
            "Auftraggeber ist nicht im Steuerungsgremium",
            "Steuerungsgremium trifft bereichübergreifend Entscheidungen",
            "PM koordiniert Kommunikation zwischen Teams"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Der Auftraggeber hat die Aufgabe",
            "answers": ["Strategien und Ziele mit dem Steuerungsgremium festzulegen",
            "Mit dem PM die Dokumentation durchführen",
            "Mit dem PM Projektteile abzunehmen",
            "Mit dem Steurungsgremium Projektteile abzunehmen"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Konzeption",
            "question": "Kanban kann...",
            "answers": ["Nicht über schon bestehende Prozesse gelegt werden",
            "Nur einstufige Prozesse in visueller Form darstellen",
            "Im Rahmen von agilen Methoden eingesetzt werden",
            "Selbstorganisation abnehmen dank strikter Regeln"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Scrum ist ...",
            "answers": ["Ein dynamisches Prinzip das inkrementell und rekursiv funktioniert",
            "Ein agiles Prinzip das inkrementell und iterativ funktioniert",
            "Ein dynamisches Prinzip das inkrementell und iterativ funktioniert",
            "Ein statisches Prinzip das rekursiv funktioniert"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Konzeption",
            "question": "Was gehört zur Machbarkeitsprüfung?",
            "answers": ["Akzeptanz der Sponsoren",
            "Physische Machbarkeit",
            "Ressourcenverfügbarkeit",
            "Rahmenbedingungen"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Konzeption",
            "question": "Welche Aussage passt hier nicht rein?",
            "answers": ["Es ist Vereinbarungssache was der PM darf",
            "Anforderungen & Aufgaben werden für jede Rolle festgelegt",
            "Anzahl der Rollen hängt von Größe des Projekts ab",
            "Ein Projekt braucht nur einen Auftraggeber und -nehmer"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Wer ist für die Kommunikation zwischen den einzelnen Instanzen des Projekts verantwortlich?",
            "answers": ["Die Mitarbeiter",
            "Der Projektmanager",
            "Das Steering Committee",
            "Der Auftraggeber"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": "Wer ist für die Kommunikation mit dem Auftraggeber des Projekts verantwortlich?",
            "answers": ["Die Projektmanager",
            "Das Steering Committee",
            "Der Ausschuss",
            "Die Stakeholder"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": "Was ist im Scope definiert?",
            "answers": ["Die Wünsche des Auftraggebers",
            "Die verschiedenen Teams",
            "Inhalt und Umfang des Projects",
            "Alle Termin, die im Vorhinein gesetzt werden"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "In einem Meeting/in einer Besprechung ist es wichtig…",
            "answers": ["Genügend Kaffee für alle Teilnehmer bereit zu stellen",
            "Parteien, die man persönlich nicht mag, nicht zu Wort kommen lassen",
            "Auch die Meinung von Leuten einholen, die nicht am Projekt beteiligt sind",
            "Sich an eine bestimmte Agenda zu halten"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Was versteht man unter dem Begriff Kick-off?",
            "answers": ["Kleine Sporteinheit zum Lockern der Muskeln im Büro",
            "Eine Besprechung um Teammitglieder aus dem Projekt zu werfen",
            "Die Startveranstaltung eines Projekts / einer Projektphase",
            "Nach Feierabend gehen alle Projektbeteiligen zusammen Fußball spielen"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "Was versteht man unter dem Begriff Deadline?",
            "answers": ["Das Budget darf eine bestimmte Grenze nicht überschreiten",
            "Die Teammitglieder überarbeiten sich",
            "Das Projekt hat einen bestimmten Abgabe- / Schlusstermin",
            "Wenn das Projekt scheitert, geht das Unternehmen zu Grunde"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "Für die Arbeit in Projekten verwendet man üblicherweise den Begriff Team, nicht Gruppe. Warum? ",
            "answers": ["Ein Team besteht nicht aus einer Gruppe von Personen",
            "Ein Team hat ein gemeinsames Ziel",
            "Ein Team ist auf Dauer angelegt",
            " Ein Team ist definitionsgemäß, harmonisch und konfliktfrei"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": "Welche Eigenschaft hat ein Milestone?",
            "answers": ["Er ist messbar und beobachtbar",
            "Es ist ein harter Stein",
            "Es ist ein zeitabhängiges Produkt",
            "Es hat kein Ende"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": "Wann wird ein Milestone üblicherweise definiert?",
            "answers": ["Zu Beginn jedes Projekts werden alle Milestones definiert",
            "Milestones werden meist am Ende von Projektphasen definiert",
            "Wenn die Projektmanager unzufrieden mit dem Verlauf des Projekts sind",
            "Im Projekt gibt es regelmäßige Milestones-Meetings"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": "Welches der folgenden Beispiele ist aus Ihrer Sicht kein Meilenstein?  ",
            "answers": ["Ein kritischer Abschnitt wird erreicht ",
            "Projektmeeting",
            "Abnahmetermin durch Kunden ",
            "Eine wichtige Entscheidung ist zu fällen "],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": "Was passiert in der Initialisierungsphase eines Projekts?",
            "answers": ["Das Team wird festgelegt",
            "Die Projektmanager stellen einen Zeitplan auf",
            "Das Projektbudget wird festgelegt",
            "Eine Idee/ein Vorschlag wird als Projekt genehmigt"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Kommunikation – Feedbacks: Welche Funktion haben Feedbacks in der Projektarbeit?",
            "answers": [" Sie sollen die Verständigung verbessern",
            "Ein Feedback sollte nur am Ende eines Gespräches gegeben werden",
            " Feedbacks sollten möglichst viele Du-Botschaften enthalten",
            " Feedbacks sollten situations- und sachbezogen sein"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": "Wie lautet die Meetings - Ergebnislistentechnik?",
            "answers": ["ABEF",
            "ACEF",
            "ADEF",
            "AEBF"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": " Was ist der häufigste Grund für das Scheitern von Projekten?",
            "answers": ["Der Zufall",
            "Mangel an qualifizierten Mitarbeitern",
            "Kompetenzstreitigkeiten",
            "Kommunikation"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Auf welche Arten und Weisen können nonverbale Nachrichten mit verbalen Nachrichten interagieren?",
            "answers": [" Wiederholen, widersprüchlich, ergänzen, ersetzen, regulieren und akzentuieren",
            " Wiederholen, widersprüchlich, ergänzen, vertreten, regulieren und akzentuieren",
            "Den Blickkontakt nie verlieren",
            "In der Haltung dominierend"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": "Welche Maßnahmen sollte ein Projektmanager für ein Meeting treffen?",
            "answers": ["Er sollte die Besprechung nicht selbst leiten",
            "Er muss am meisten Reden und die anderen Teilnehmer kaum zu Wort kommen lassen",
            "Er stellt für die Besprechung einen geeigneten Raum und Mittel bereit",
            "Das Vorbereiten eines Meetings ist nicht die Aufgabe des Projektmanagers"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "Nach Bruce W.Tuckmann folgt der Teamentwicklungsprozess einer bestimmten Reihenfolge. Welche?",
            "answers": [" Norming, Performing, Adjourning, Forming, Storming",
            " Performing, Adjourning, Forming, Storming, Norming",
            " Forming, Storming, Norming, Performing, Adjourning",
            " Storming, Norming, Performing, Forming, Adjourning"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "Was zählt bei der Vorbereitung eines Meetings?",
            "answers": ["Bereiten Sie die logische Reihenfolge der Diskussionspunkte und einen Zeitablauf vor",
            "Geben Sie jedem Punkt genügend Zeit, aber nach der Dringlichkeit",
            "Freie interne Meeting Regeln ",
            "Jeder Diskussionspunkt bekommt die gleiche Zeit"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Realisation",
            "question": "Wie sollte sich ein Projektmanager in einer Diskussion/Debatte über das Projekt verhalten?",
            "answers": ["Er sollte sich an der Diskussion beteiligen",
            "Darauf achten, dass alle relevanten Positionen zu Wort kommen",
            "Zügige Entscheidungen treffen, da er in Fachfragen kompetenter ist",
            "Bei Meinungsverschiedenheiten die Diskussion schnell beenden"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": " Welche Aussage trifft nicht zu? (Kommunikation auf Sach- und Beziehungsebene)",
            "answers": ["Auf der Sachebene geht es um Termine, Organisationsaufgaben und Projektziele",
            "Ein Meeting über das schlechte Teamklima ist vorwiegend auf der Beziehungsebene",
            "Konflikte werden auf Sachebene diskutiert, betreffen aber oft Beziehungsebenen",
            "In der Projektarbeit muss der Beziehungsaspekt außen vor bleiben"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Was sind die 4 großen Überkategorien des Projektmanagementzyklus?",
            "answers": ["Ideen, Design, Planung, Durchführung",
            "Brainstorming, Planung, Design, Ausführung",
            "Beginn, Planung, Ausführung, Abschluss",
            "Design, Planung, Ausführung, Vollendung"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Realisation",
            "question": "Welche der folgenden Aufgaben sind im Projektstart üblicherweise durchzuführen?",
            "answers": ["Den Projektfortschritt genau überwachen",
            "Jedem Mitarbeiter seine Aufgaben genau zuweisen",
            "Die eventuellen Risiken identifizieren und analysieren",
            "Eine Nachkalkulation machen"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Realisation",
            "question": "Was ist die Bedeutung des Sender-Empfänger-Problems?",
            "answers": ["Aufgrund der Technik kann es zu Kommunikationslücken im Team kommen",
            "Der Empfänger versteht die Nachricht nicht so, wie der Sender es gemeint hat",
            "Der Sender verschickt seine Nachrichten an den falschen Empfänger",
            "Oftmals sind die Position von Sender und Empfänger nicht klar verteilt"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Realisation",
            "question": "Welche Entscheidungen kann der Projektmanager im Projekt selber treffen?",
            "answers": ["Entscheidungen, die während der Projektbearbeitung getroffen werden müssen",
            "Entscheidungen die sich auf das Projektportfolio als Ganzes beziehen",
            "Die mit langfristigen Investitionen des Unternehmens verbunden sind",
            "Entscheidungen, die keinen Einfluss auf Termine und Kosten im Projekt haben"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "Welchen Sinn hat der Projektabschlussbericht?",
            "answers": ["Es gibt kein tieferen Sinn",
            "Verkündung des Projektendes",
            "Verkündung der Ergebnisse",
            "Verkündung der Erkentnisse"],
            "difficulty": "1",
            "rightIndex": "2"
        },
        {
            "category": "Projektabschluss",
            "question": "Welche Zielgruppe hat die Abschlusspräsentation?",
            "answers": ["Projektauftraggeber",
            "Steakholder",
            "Die Produktnutzer",
            "Die Entiwckler, des Auftragnehmers"],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "Wer unterzeichnet den Abschlussbericht?",
            "answers": ["Der Produktnutzer",
            "Der Produkverantwortliche",
            "Der Auftraggeber",
            "Der Auftagnehmer"],
            "difficulty": "1",
            "rightIndex": "3"
        },
        {
            "category": "Projektabschluss",
            "question": "Was ist kein Bestandteil des Projektabschlussbericht?",
            "answers": ["Zeitkosten und Personalaufwand",
            "Hinweis auf mögliche Anschlussprojekte",
            "Aufgaben und erzielte Ergebnisse",
            "Die persönlichen lessosn learned"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Was beschreibt die \"Restaktivität\"?",
            "answers": ["Eine Projektaktivität, die noch zu erledigenist",
            "Die nicht berücksichtigten Aufgaben",
            "Die gescheiterten Prototypen",
            "Der Papierkram am Ende "],
            "difficulty": "1",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "In welcher Planungsphase werden die Bestandteile des Projektabschlusses definiert?",
            "answers": ["Bei dem Start des Projektabschlusses",
            "Nach der fertigstellung eines Prototypen",
            "Am Ende der Entwicklungspahse",
            "Bei dem Beginn der Projektplanung"],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Was gehört zu den \"lessons learned\"?",
            "answers": ["weder positiv noch negative",
            "negative",
            "positive",
            "positive und negative "],
            "difficulty": "1",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Wann erfolgt die Entlastung und Auflösung der Projektorganisation?",
            "answers": ["Mit der Unterzeichnung des Abschlussberichts",
            "Mit der Produktübergabe",
            "Mit der Abschlusspräsentation",
            "Mit der Zahlung durch den Auftraggeber"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "Welche wichtigen Informationen müssen über Restaktivitäten vorliegen?",
            "answers": ["Wie hoch sind die Restkosten",
            "Wer kümmert sich darum und bis wann sind sie erledigt",
            "Es gibt keine Restaktivitäten",
            "Welchen Grund haben die Restaktivitäten"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Projektabschluss",
            "question": "Was muss passieren bevor das Produkt übergeben wird?",
            "answers": ["Das Projekt muss beendet werden",
            "Es muss ein Abnahmetest durchlaufen werden",
            "Es muss ein Prototyp übergeben werden",
            "Die Entwicklungsschritte müssen offengelegt werden"],
            "difficulty": "2",
            "rightIndex": "2"
        },
        {
            "category": "Projektabschluss",
            "question": "Was ist keine gute Methode zur Erfahrungssicherung?",
            "answers": ["Schriftliche Befragung der Teammitglieder",
            "Ein informelle Gespräch mit einzelnen Teammitgliedern",
            "Ein formelles Gespräch in der Gruppe",
            "Ein informelles Gespräch in der Gruppe"],
            "difficulty": "2",
            "rightIndex": "3"
        },
        {
            "category": "Projektabschluss",
            "question": "Wann spricht man von einem Projektabbruch?",
            "answers": ["Wenn die Projektziele nach der Deadline nicht erreicht sind",
            "Wenn das Team einen Meilenstein nicht geschafft hat",
            "Wenn die Projekterfolge am minimalsten sind",
            "Wenn die finanziellen Mittel knapp werden"],
            "difficulty": "2",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "Welcher der question sind für die Erfahrungsauswertung wichtig?",
            "answers": ["Welche Fehler sind passiert?",
            "Welche Aufgaben wurden falsch verteilt?",
            "Welche Erfahrung nimmt die Gruppe mit?",
            "Welche Erfahrung nimmt der Einzelne mit?"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Was gehört nicht zu einer Projektreview",
            "answers": ["Soll-Ist-Abgleich",
            "Zufriedenheit der Teammitglieder",
            "Beurteilung der Leistung der Projektmitarbeiter",
            "Analyse des Erfolgs"],
            "difficulty": "2",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Welche Aspekte treffen auf \"lessons learned\" nicht zu?",
            "answers": ["Finanzielle Maßnahmen zur Sicherung der Produktqualität",
            "Risiken und Eintrittswahrscheinlichkeiten",
            "Effizienz der Projektorganisation",
            "Effizienz des Projektmanagements"],
            "difficulty": "3",
            "rightIndex": "1"
        },
        {
            "category": "Projektabschluss",
            "question": "Wann ist es am wichtigsten ein Erfahrungsprotokoll zu schreiben?",
            "answers": ["Bei der Projektreflektion",
            "Nach der Projektlaufzeit",
            "Vor der Projektlaufzeit",
            "Während der Projektlaufzeit"],
            "difficulty": "3",
            "rightIndex": "4"
        },
        {
            "category": "Projektabschluss",
            "question": "Mit welchem Modell kann man die vorgehensweise von \"lessons learned\" gut Interpretieren?",
            "answers": ["Princess1",
            "Queen5",
            "Prince2",
            "King2"],
            "difficulty": "3",
            "rightIndex": "3"
        },
        {
            "category": "Projektabschluss",
            "question": "Für wen sollte der spezifische Informationsbedarf ausgerichtet sein?",
            "answers": ["Auf den des Projektleitenden",
            "Auf den des Empfängers",
            "Auf den eines fachfremden Mitarbeiters",
            "Auf den eines fachlichen Mitarbeiters"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Projektabschluss",
            "question": "Was gehört nicht in den Projektabschlussbericht?",
            "answers": ["Projektbeschreibung (Ziele | Inhalte | Budget)",
            "Projektstrukturplan",
            "Anregung für zukünfitge Projekte (lessons learned)",
            "Projektergebnisse (Soll-Ist Vergleich)"],
            "difficulty": "3",
            "rightIndex": "2"
        },
        {
            "category": "Projektabschluss",
            "question": "Welche der question gehören nicht zur Analyse der Projektergebnisse?",
            "answers": ["Welche Teilziele konnten nicht erreicht werden?",
            "Wie ist das Projektmanagement und die Teamarbeit zu bewerten?",
            "Wie gut war die organisatorische Einbindung des Projektes in das Unternehmen?",
            "Welche Schwierigkeiten traten auf und wie haben diese den Erfolg beeinträchtigt?"],
            "difficulty": "3",
            "rightIndex": "1"
        }
    ]

    QUESTION.addQuestions(questionsToImport, (err, questions) => {});

    app.get(`/${KEY}/:id`, (req, res) => {
        ROOM.getRoom(req.params.id, (err, room) => {
            if (!err && room) {
                res.status(200).send({ status: 'success', data: room });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to get room' });
            }
        });
    });
    
    app.post(`/${KEY}/`, (req, res) => {
        let data = req.body;
        data.state = 'LOBBY';
        ROOM.createRoom(data, (err, room) => {
            if(!err && room) {
                res.status(200).send({ status: 'success', data: room });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to create room' })
            }
        });
    });

    app.put(`/${KEY}/:id/start`, (req, res) => {
        const data = req.body;
        if(data.rounds && data.time) {
            ROOM.startRoom(req.params.id, data.time, data.rounds, (err, room) => {
                if(!err && room) {
                    res.status(200).send({ status: 'success', data: room });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to create room' })
                }
            });
        }
    });

    app.put(`/${KEY}/:id/end`, (req, res) => {
        const data = req.body;
        if(data.playerData) {
            ROOM.endRoom(req.params.id, data.playerData, (err, room) => {
                if(!err && room) {
                    res.status(200).send({ status: 'success', data: room });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to end room' })
                }
            });
        }
    });

    app.get(`/${KEY}/:id/categories`, (req, res) => {
        ROOM.getRoom(req.params.id, (err, room) => {
            if(!err && room) {
                QUESTION.getQuestions((err, questions) => {
                    if(!err && questions) {
                        let categories = [];
                        for(let question of questions) {
                            if(room.playedQuestions.indexOf(question) !== -1) {
                                let categorysByName = categories.filter((category) => category.name == question.category);
                                
                                if(categorysByName > 0) {
                                    let categoryToUpdate = categorysByName[0];
                                    switch(question.difficulty) {
                                        case 1:
                                            categoryToUpdate.easy++;
                                            break;
                                        case 2:
                                            categoryToUpdate.medium++;
                                            break;
                                        case 3:
                                            categoryToUpdate.hard++;
                                            break;
                                        default:
                                            break;
                                    }
                                } else {   
                                    let category = {
                                        name: question.category,
                                        easy: 0,
                                        medium: 0,
                                        hard: 0,
                                    }

                                    switch(question.difficulty) {
                                        case 1:
                                            category.easy++;
                                            break;
                                        case 2:
                                            category.medium++;
                                            break;
                                        case 3:
                                            category.hard++;
                                            break;
                                        default:
                                            break;
                                    }
                                    categories.push(category);                    
                                }
                            }
                        }
        
                        let randomCategories = [];
                        if(categories > 3) {
                            do {
                                const randomElement = categories[Math.floor(Math.random() * categories.length)]
                                if(randomCategories.indexOf(randomElement) !== -1) {
                                    randomCategories.push(randomElement);
                                }
                            } while(randomCategories.length < 3);
                        } else {
                            randomCategories = categories;
                        }
                        
                        res.status(200).send({ status: 'success', data: randomCategories })
                    } else {
                        res.status(200).send({ status: 'error', message: 'Unable to find categories' })
                    }
                });
            } else {
                res.status(200).send({ status: 'error', message: 'Unable to find room' })
            }
        });

    });

    app.get(`/${KEY}/:id/question`, (req, res) => {
        const data = req.body;
        if(data.category && data.difficulty) {
            ROOM.getRoom((err, room) => {
                if(!err && room) {
                    QUESTION.getQuestionRandom(data.category, data.difficulty, room.playedQuestions, (err, question) => {
                        if(!err && question) {
                            room.push(question._id);
                            ROOM.updateRoom(room._id, room, { new: true }, (err, room) => {
                                if(!err && room) {
                                    res.status(200).send({ status: 'success', data: question })
                                } else {
                                    res.status(200).send({ status: 'error', message: 'Unable to save question id' })
                                }
                            });
                        } else {
                            res.status(200).send({ status: 'error', message: 'Unable to get random question' })
                        }
                    });
                } else {
                    res.status(200).send({ status: 'error', message: 'Unable to find room' })
                }
            });
        } else {
            res.status(200).send({ status: 'error', message: 'You provided wrong data' })
        }
    });

}