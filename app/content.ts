export type Kapittel = {
  number: number;
  title: string;
};

export type Tema = {
  id: string;
  kapittelRange: string;
  title: string;
  description: string;
  kapitler: Kapittel[];
};

export const temaer: Tema[] = [
  {
    id: "stad-og-tru",
    kapittelRange: "01–07",
    title: "Stad og tru",
    description: "Frå dei gamle steinkrossane til Eivindvik som tingstad og kyrkjestad.",
    kapitler: [
      { number: 1, title: "Innleiing" },
      { number: 2, title: "Namnet" },
      { number: 3, title: "Steinkrossane" },
      { number: 4, title: "Døypefonten i kyrkja" },
      { number: 5, title: "Olavskjelda i Krossteigen" },
      { number: 6, title: "Eivindvik som gamal tingstad" },
      { number: 7, title: "Gulen kyrkje" },
    ],
  },
  {
    id: "folk-og-ferdsel",
    kapittelRange: "08–14",
    title: "Folk og ferdsel",
    description: "Menneska som kom til bygda, og stadene som batt bygda saman med omverda.",
    kapitler: [
      { number: 8, title: "Prost Niels Griis Alstrup Dahl" },
      { number: 9, title: "Eivindvik som poststad" },
      { number: 10, title: "Dampskipsstoppestaden" },
      { number: 11, title: "Kongevitjingar" },
      { number: 12, title: "Andre vitjingar" },
      { number: 13, title: "Namnebyte – frå Evenvik til Gulen" },
      { number: 14, title: "Andre hendingar" },
    ],
  },
  {
    id: "liv-og-tradisjon",
    kapittelRange: "15–20",
    title: "Liv og tradisjon",
    description: "Forteljingar om arbeid, krig, skikkar, høgtider og livet i bygda.",
    kapitler: [
      { number: 15, title: "Livet i bygda" },
      { number: 16, title: "Minne frå krigen 1940–45" },
      { number: 17, title: "Gamle skikkar" },
      { number: 18, title: "Gamal julefeiring" },
      { number: 19, title: "Næringslivet" },
      { number: 20, title: "Ymse" },
    ],
  },
  {
    id: "ord-og-minne",
    kapittelRange: "21–27",
    title: "Ord og minne",
    description: "Prologar, rim, tankar og minneord tek vare på røystene frå staden.",
    kapitler: [
      { number: 21, title: "Gulatingminne" },
      { number: 22, title: "Tankar" },
      { number: 23, title: "Prologar" },
      { number: 24, title: "Rim" },
      { number: 25, title: "Høgtider" },
      { number: 26, title: "Minneord" },
      { number: 27, title: "Bankar" },
    ],
  },
];
