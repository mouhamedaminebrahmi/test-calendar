import React from "react";
import events from "../Data/events.json";
import { sortEvents, groupXEvents, getMinutesStart, colors } from "../utils/eventHelpers";

const Calendar = () => {
  const overlappingGroup = groupXEvents(sortEvents(events));
  console.log(overlappingGroup);

  return (
    // div 720px de hauteur - représentant 12h de 9h à 21h, donc 60 minutes * 12 = 720
    <div style={{ height: "720px", position: "relative", border: "1px solid black" }}>
      {overlappingGroup.map(function (group, index) {
        //Stocker le nombre d'événements dans le groupe actuel.
        const groupLength = group.length;
        //Calcule la largeur de chaque événement en divisant 100 par le nombre d'événements
        const widthE = 100 / groupLength + "%";
        return group.map(function (event, idx) {
          //La hauteur  calculée en fonction de sa durée.
          const heightE = (event.duration * 720) / 720;
          //La position top calculée à partir de son heure de début.
          const topE = (getMinutesStart(event.start) * 720) / 720;

          return (
            <div
              key={event.id}
              style={{
                position: "absolute",
                top: topE + "px",
                left: idx * parseFloat(widthE) + "%",
                width: widthE,
                height: heightE + "px",
                backgroundColor: colors[event.id % colors.length],
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                overflow: "hidden",
              }}
            >
              <div>{event.id}</div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  fontSize: "12px",
                  padding: "2px 4px",
                  background: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {event.start}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  fontSize: "12px",
                  padding: "2px 4px",
                  background: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {event.start.split(":")[0]}:{parseInt(event.start.split(":")[1]) + event.duration}
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default Calendar;
