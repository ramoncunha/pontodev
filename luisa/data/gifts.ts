export interface Gift {
  id: string;
  name: string;
  imageUrl: string;
  storeUrl: string;
  priceLabel: string;
  giverName?: string; // Optional name of the person giving the gift
}

export const initialGifts: Gift[] = [
  {
    id: "1",
    name: "Fraldas Pampers Premium Care - Tam. M",
    imageUrl: "/luisa/images/baby_diapers_pink_1775099017053.png",
    storeUrl: "https://www.amazon.com.br",
    priceLabel: "R$ 89,90"
  },
  {
    id: "2",
    name: "Conjunto Body e Meias Algodão",
    imageUrl: "/luisa/images/baby_onesie_beige_1775099031589.png",
    storeUrl: "https://www.amazon.com.br",
    priceLabel: "R$ 65,00"
  },
  {
    id: "3",
    name: "Mamadeiras e Chupetas Premium Aurelia",
    imageUrl: "/luisa/images/baby_bottles_pastel_1775099045817.png",
    storeUrl: "https://www.amazon.com.br",
    priceLabel: "R$ 120,00"
  }
];
