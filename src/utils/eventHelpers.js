/**
 * tri des événements par heure de début.
 * @param events - un tableau d'objets représentant des événements.
 * @returns événements triés.
 */
export function sortEvents(events) {
  return events.sort(function (a, b) {
    if (a.start < b.start) {
      return -1;
    } else if (a.start > b.start) {
      return 1;
    } else {
      return 0;
    }
  });
}

/**
 * vérifie si deux événements se chevauchent en fonction de leurs heures de début et de leurs durées.
 * @param event1 -
 * @param event2 -
 * @return une valeur booléenne indiquant si event1 et event2 se chevauchent.
 */
export function isOverlapping(event1, event2) {
  const start1 = event1.start.split(":");
  const end1 = parseInt(start1[0]) + event1.duration / 60;

  const start2 = event2.start.split(":");
  const end2 = parseInt(start2[0]) + event2.duration / 60;

  const firstCondition = start1[0] < end2;
  const secondCondition = start2[0] < end1;

  return firstCondition && secondCondition;
}

/**
 *  ==> [{},{}] ==> [[{}],[{},{}]] :  tableaux d'événements qui se chevauchent.
 * @param sortedEvents - Un tableau d'événements triés par ordre croissant en fonction de leur heure de début.
 * @return un tableau de tableaux, où chaque tableau interne représente un groupe d'événements qui se chevauchent.
 */
export function groupXEvents(sortedEvents) {
  const overlappingGroup = [];
  //parcourt tous les événements fournis dans sortedEvents
  for (let i = 0; i < sortedEvents.length; i++) {
    let event = sortedEvents[i];
    let isLapping = false;

    for (let j = 0; j < overlappingGroup.length; j++) {
      const result = overlappingGroup[j];
      if (
        //vérifie si au moins un des événements se chevauche avec l'événement en cours
        result.some(function (groupEvent) {
          return isOverlapping(groupEvent, event);
        })
      ) {
        result.push(event);
        isLapping = true;
        break;
      }
    }

    if (!isLapping) {
      overlappingGroup.push([event]);
    }
  }
  return overlappingGroup;
}

/**
 * temps au format "HH:MM" ==> renvoie le nombre de minutes écoulées depuis 9h00.
 * @param time - Une heure au format "HH:MM".
 * @renvoie le nombre de minutes écoulées depuis 9h00 en fonction de l'heure de saisie.
 */
export function getMinutesStart(time) {
  const result = time.split(":");
  return (parseInt(result[0]) - 9) * 60 + parseInt(result[1]);
}

export const colors = ["#FFD700", "#FF4500", "#8A2BE2", "#20B2AA", "#00FF7F", "#FF6347", "#FF69B4", "#F0E68C", "#1E90FF", "#FF1493"];
