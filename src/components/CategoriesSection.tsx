export default function CategoriesSection() {
    const categories = [
        { name: "Skincare", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMOEVJGRDtkAU_fd07NhEbIEUCHCDPwJEthLIJL9a5q-KgZHGzPgHhOpwqCdMuLeFMtt2xGUC6yQAgDb5YMnRBSfUQ4rTXr2a0C-ujrtfDfX7CQwR2tMrBfJagHBdjYcdJ3zvtVay4cRxgQA0fIiZc1CqOcCbZWRc_SJDrzcRdt7WMeUSj8pxSVdhNoBEJfn1rtFm7GacXZlB4kWeDG2TtQ8DbBtxkb30iEosLSs52SmWgfo4guIs6Sg" },
        { name: "Artistry", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuADBUUpTrSBgyfZFOt8BganAuR1EgeJC1T7otpXU2tRiGpTvhlUqg0neUUb1ebOyIkjaQxMFaZr7fX2p-SNOpanzlCnS3RoATeUd5729SJV6nuTpxX44CdWofHY5IAdTIPY62jowa_6ru96ejvftbgdm9r0m5XBtOJ-jdEDhGj7KFPMq26nqwpsiBkqjWoDPffpUjziyPLEWypIITNEU2PT60xJ7QsijmCCClzHsWrKYXs9qNTZG96Sqg" },
        { name: "Haircare", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_YQ70HNSpXBqVPBmMqMXj0DbwwNJHUfsoPi7YZsVq0U7AgriE7dxIPlqDPqRHDzx3zBI1fkgd_sanGxa50WzOkQ90AFbuYfUrAqKKC5tsAgp2hbnEwPjAVQnE8W-ZGSBgeFHVtZmXYrILTdaC72UZPzTRFlIoGcnfVk1xyKnu99iW03tyBCrz64-_ScD2T41JBfjbhH_7kuONRBBb5HmcG9mr0nykXjfD2p_RuqCD-DU-DwtJiwf1ug" },
        { name: "Fragrance", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw8vCy288GOvoylH7sq3rqB-RYXjhxGKPjCQEmE0A7FDrRXMkZQle_CuchTG6EaGcqSX2i9xsEkzeASYkG7NvivIzRDsRWbVxddv7patqntd8-bPFmXiVeePFWmQWdoT1pnhzCJE00e7Kcrcwn3haGC3Dlkj2qErOD4Jo5T84K4G_bVwAAHExfoEDtdEH5328hTsABs94_0paNJ38BjBz5L7XHVmbn7iNIcDT-ti9IohBE49F7Ggh2Tw" },
        { name: "Grooming", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC55OqdgawRSRLXGm3HtZr2Aq7UzSp62-WzGQltQzHXjvF2cjZEamHBVzdEX-nM-qAIckv-zqPPkb-NhKZTzoHaYWoEtbgCbvnSof0I2QBVwwCYqkPLzg3tt_FkfPpnCByJ0xV8T7msof1tRw4sMy--LxXeCKYp_Y9WeZ1WQbKB9TF5bA3cJhaVbEnIZRUgoEEt7qk27AR0xcqCkRYJfrMIhesOswV59RzaIcJSXhJ1wfQVfvqyYES-CQ" },
    ];
  return (
    <section className="px-6 md:px-10 py-12">
      <h2 className="text-2xl font-semibold mb-8">Categories</h2>
      <div className="flex overflow-x-auto space-x-8 pb-4">
        {categories.map((cat) => (
          <div key={cat.name} className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all">
                <img className="w-full h-full object-cover" src={cat.image} alt={cat.name} />
            </div>
            <span className="text-sm font-semibold">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
