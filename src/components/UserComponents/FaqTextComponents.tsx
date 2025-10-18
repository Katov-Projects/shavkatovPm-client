"use client";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "IT loyiha boshqaruvi (PM) nima?",
    content:
      "IT loyiha boshqaruvi bu loyiha rejaga muvofiq, vaqtida va sifatli tugallanishini ta’minlaydigan jarayondir. Project Manager yoki qisqa qilib PM loyiha boshlig‘i hisoblanadi. U jamoani boshqaradi, mijoz bilan muloqot qiladi, vazifalarni taqsimlaydi va hammasi reja asosida ketishini nazorat qiladi.",
  },
  {
    id: "2",
    title: "Agile va Waterfall o‘rtasidagi farq qanday?",
    content:
      "Waterfall usulida ishlar qat’iy ketma-ketlikda bajariladi. Avval reja tuziladi, keyin dizayn qilinadi, keyin dasturlash va test qilinadi. Orqaga qaytish qiyin. Agile usulida esa loyiha kichik qismlarga bo‘linib bajariladi. Har safar tayyor qilingan bo‘lak mijozga ko‘rsatiladi va kerak bo‘lsa o‘zgarish kiritiladi.",
  },
  {
    id: "3",
    title: "IT loyihasini qanday boshlash kerak?",
    content:
      "Avvalo loyiha maqsadini aniq belgilash kerak. Keyin kimlar uchun mo‘ljallanganini aniqlash lozim. Shundan so‘ng kerakli funksiyalar ro‘yxati tuziladi. Texnologiya va jamoa tanlanadi.",
  },
  {
    id: "4",
    title: "Jamoa bilan samarali ishlash uchun nima qilish kerak?",
    content:
      "Jamoada vazifalar aniq taqsimlanishi kerak. Doimiy aloqa qilish juda muhim. Har bir a’zo nima qilayotganini boshqalar ko‘rib turishi kerak. Shu bilan birga ochiq gaplashish va bir-biriga yordam berish muhitini yaratish jamoani samarali qiladi.",
  },
  {
    id: "5",
    title: "IT loyihalarida xavflarni qanday boshqariladi?",
    content:
      "Xavf bu loyiha davomida paydo bo‘lishi mumkin bo‘lgan muammo. Masalan, deadline'ga ulgurmaslik, jamoa a’zosining ketib qolishi yoki byujet yetarli bo‘lmasligi. Bunday vaziyatlarni boshqarish uchun ularni oldindan yozib chiqish, har biri uchun yechim rejasini tayyorlash va favqulodda holatlar uchun qo‘shimcha vaqt hamda byujet qoldirish kerak bo‘ladi.",
  },
  {
    id: "6",
    title: "IT loyihasi uchun qanday qilib buyurtma beraman?",
    content:
      "Avval o‘z g‘oyangizni aniq yozib chiqing. Unda qanday funksiyalar bo‘lishini ham ro‘yxat qiling. Byujet va muddatni taxminan belgilang. Keyin IT biz bilan bilan bog‘lanib, shu talablaringizni tushuntiring. Shartnoma tuzib, bosqichma-bosqich ishlashni boshlash kerak bo‘ladi.",
  },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
      duration: 0.4,
    },
  }),
};

// ✅ SHU YERDA FaqItem komponentini yaratamiz:
const FaqItem = React.memo(({ item, index }: { item: any; index: number }) => (
  <motion.div
    custom={index}
    variants={fadeInAnimationVariants}
    initial="initial"
    animate="animate"
  >
    <AccordionItem
      value={item.id}
      className={cn(
        "my-1 overflow-hidden !border-b-1 !border-b-[#BEBEBE] px-2 transition-colors"
      )}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            "group flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium",
            "hover:text-primary transition-all duration-300 outline-none",
            "focus-visible:ring-primary/50 focus-visible:ring-2",
            "data-[state=open]:text-primary"
          )}
        >
          {item.title}
          <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0">
            <PlusIcon
              size={18}
              className={cn(
                "text-primary/70 transition-transform duration-300 ease-out",
                "group-data-[state=open]:rotate-45"
              )}
              aria-hidden="true"
            />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionContent
        className={cn(
          "text-muted-foreground overflow-hidden pt-0 pb-4",
          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up"
        )}
      >
        <div className="border-border/30 border-t pt-3">{item.content}</div>
      </AccordionContent>
    </AccordionItem>
  </motion.div>
));

function Faq1() {
  return (
    <section className="py-3 md:py-16">
      <div className="container mx-auto max-w-8xl px-4 md:px-6">
        <motion.div
          className="relative mx-auto max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Decorative gradient */}
          <div className="bg-primary/10 absolute -top-4 -left-4 -z-10 h-72 w-72 rounded-full md:blur-3xl blur-none" />
          <div className="bg-primary/10 absolute -right-4 -bottom-4 -z-10 h-72 w-72 rounded-full md:blur-3xl blur-none" />

          <Accordion
            type="single"
            collapsible
            className="w-full rounded-xl backdrop-blur-sm"
            defaultValue="0"
          >
            {/* ⬇️ endi shu yerda FaqItem ishlatamiz */}
            {items.map((item, index) => (
              <FaqItem key={item.id} item={item} index={index} />
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default Faq1;
