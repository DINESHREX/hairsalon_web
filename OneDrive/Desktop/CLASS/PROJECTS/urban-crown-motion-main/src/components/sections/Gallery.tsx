import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedText } from "../AnimatedText";
import { TiltCard } from "../TiltCard";
import { BeforeAfterSlider } from "../BeforeAfterSlider";
import { SectionDivider } from "../SectionDivider";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImage from "@/assets/hero-image.jpg";
import aboutImage from "@/assets/about-image.jpg";

const galleryItems = [
  {
    id: 1,
    title: "Classic Taper Fade",
    category: "Precision Cut",
    image: heroImage,
    type: "image" as const,
  },
  {
    id: 2,
    title: "Transformation",
    category: "Before & After",
    beforeImage: aboutImage,
    afterImage: heroImage,
    type: "beforeAfter" as const,
  },
  {
    id: 3,
    title: "Modern Pompadour",
    category: "Signature Style",
    image: aboutImage,
    type: "image" as const,
  },
  {
    id: 4,
    title: "Beard Sculpting",
    category: "Grooming",
    image: heroImage,
    type: "image" as const,
  },
  {
    id: 5,
    title: "Balayage Color",
    category: "Hair Color",
    image: aboutImage,
    type: "image" as const,
  },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
    <section className="relative py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-primary font-body uppercase letter-spacing-wider text-xs mb-6 block text-center"
        >
          Our Work
        </motion.span>

        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground text-center mb-16">
          <AnimatedText text="Signature Styles" />
        </h2>

        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            {/* Mobile Swipe Hint */}
            <motion.div 
              className="flex justify-center items-center gap-2 mb-4 md:hidden text-muted-foreground text-xs uppercase letter-spacing-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>←</span> Swipe to Explore <span>→</span>
            </motion.div>

            <CarouselContent className="-ml-4">
              {galleryItems.map((item, index) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    {item.type === "beforeAfter" ? (
                      <div className="relative h-full select-none">
                        <BeforeAfterSlider
                          beforeImage={item.beforeImage!}
                          afterImage={item.afterImage!}
                        />
                        <div className="mt-6 text-center">
                          <span className="text-primary text-xs uppercase letter-spacing-wide">
                            {item.category}
                          </span>
                          <h3 className="font-heading text-xl text-foreground mt-1">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <TiltCard className="cursor-pointer h-full" tiltAmount={5}>
                        <div
                          className="relative group h-full"
                          onClick={() => setSelectedImage(item.image)}
                          data-cursor-text="View"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                            <motion.img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            {/* Frame */}
                            <div className="absolute inset-4 border border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                          </div>
                          
                          <div className="mt-6 text-center">
                            <span className="text-primary text-xs uppercase letter-spacing-wide">
                              {item.category}
                            </span>
                            <h3 className="font-heading text-xl text-foreground mt-1">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </TiltCard>
                    )}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>

      <SectionDivider variant="ornament" />

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-8 right-8 w-12 h-12 border border-border hover:border-primary flex items-center justify-center transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </motion.button>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
};
