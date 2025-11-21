import { BookOpen, Heart, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Sobre = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Amplo Catálogo",
      description:
        "Milhares de títulos cuidadosamente selecionados para você.",
    },
    {
      icon: Heart,
      title: "Paixão por Livros",
      description:
        "Nossa equipe ama livros e está sempre pronta para ajudar.",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Faça parte de uma comunidade apaixonada por leitura.",
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Produtos originais com garantia de qualidade.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">
            Sobre Nós
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Somos uma livraria dedicada a conectar leitores com as melhores
            histórias do mundo. Nossa missão é promover a leitura e tornar os
            livros acessíveis para todos.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="rounded-lg bg-muted p-8 md:p-12">
          <h2 className="mb-6 text-3xl font-bold text-foreground">
            Nossa História
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              A BookStore nasceu em 2020 com o sonho de criar um espaço onde os
              amantes de livros pudessem descobrir novas histórias e se conectar
              com outros leitores. Começamos como uma pequena livraria de bairro
              e, graças ao apoio da comunidade, crescemos para nos tornar uma
              das principais livrarias online do país.
            </p>
            <p>
              Nossa equipe é formada por leitores apaixonados que acreditam no
              poder transformador dos livros. Cada título em nosso catálogo é
              escolhido com cuidado, pensando em proporcionar experiências de
              leitura memoráveis para todos os nossos clientes.
            </p>
            <p>
              Acreditamos que a leitura tem o poder de mudar vidas, expandir
              horizontes e criar conexões. Por isso, trabalhamos todos os dias
              para tornar os livros mais acessíveis e incentivar o hábito da
              leitura em todas as idades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
