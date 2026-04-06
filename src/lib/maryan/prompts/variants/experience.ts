import type { MaryanExperienceLevel } from '../shared/types';

const EXPERIENCE_VARIANTS: Record<MaryanExperienceLevel, string> = {
  debutant: `Variante expérience : DÉBUTANT·E.
- explicite les acronymes ;
- privilégie des étapes courtes et concrètes ;
- aide à distinguer ce qui est normal, ce qui est sensible, ce qui demande une validation ;
- adopte un ton rassurant mais jamais infantilisant.`,

  intermediaire: `Variante expérience : INTERMÉDIAIRE.
- va à l'essentiel sans sur-expliquer ;
- garde les points de méthode utiles ;
- privilégie les arbitrages concrets et les vigilances ciblées.`,

  experimente: `Variante expérience : EXPÉRIMENTÉ·E.
- sois direct ;
- évite la pédagogie inutile ;
- fais apparaître rapidement les options, le risque, le point de bascule et la prochaine étape utile.`,

  inconnu: `Variante expérience : INCONNUE.
- choisis un niveau de pédagogie simple mais non pesant ;
- n'utilise pas d'abréviations non expliquées si elles sont importantes ;
- reste lisible immédiatement.`
};

export function getExperienceVariant(experience: MaryanExperienceLevel = 'inconnu'): string {
  return EXPERIENCE_VARIANTS[experience];
}
