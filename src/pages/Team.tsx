import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const Team = () => {
  const members = [
    { name: "João Victor Borges de Lira", matricula: "01595180" },
    { name: "Juan Pablo Santos Ferreira", matricula: "01582919" },
    { name: "Lucas Araújo da Silva", matricula: "01589449" },
    { name: "Paulo Vinícius Feliciano de Souza", matricula: "01618133" },
    { name: "Wagner Vinícius Cassimiro da Silva", matricula: "01615748" },
  ];

  const colors = [
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-pink-500 to-pink-700",
    "from-indigo-500 to-indigo-700",
    "from-cyan-500 to-cyan-700",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-gradient text-center">Nossa Equipe</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Conheça os criadores do aniView
          </p>

          {/* Project Info Card */}
          <Card className="card-studio mb-12 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <h2 className="text-2xl font-semibold mb-4">Protótipo Multimídia Educacional</h2>
            <p className="text-muted-foreground mb-2">
              Disciplina: <span className="text-foreground font-semibold">Sistemas Multimídia</span>
            </p>
            <p className="text-muted-foreground">
              Tema: <span className="text-foreground font-semibold">Áudio Digital</span>
            </p>
          </Card>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {members.map((member, index) => (
              <Card
                key={member.matricula}
                className="card-studio hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${colors[index]} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-full bg-muted text-sm">
                      <span className="text-muted-foreground">Matrícula: </span>
                      <span className="font-mono font-semibold">{member.matricula}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Project Features */}
          <Card className="card-studio">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sobre o Projeto</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Páginas Completas</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-secondary mb-2">6</div>
                <div className="text-sm text-muted-foreground">Formatos Multimídia</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-accent mb-2">15</div>
                <div className="text-sm text-muted-foreground">Questões no Quiz</div>
              </div>
            </div>
          </Card>

          {/* Tech Stack */}
          <Card className="card-studio mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Tecnologias Utilizadas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Vite"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </Card>

          {/* Footer Message */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Desenvolvido com dedicação para a disciplina de Sistemas Multimídia
            </p>
            <p className="text-sm text-muted-foreground mt-2">2025</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
