import { CommonModule } from '@angular/common';
import { Data } from './../../services/data'; // Seu serviço de dados
import { Component, OnInit } from '@angular/core';

interface Link {
  name: string;
  link: string;
  isActive?: boolean; // Propriedade opcional para controlar o estado ativo
}

@Component({
  selector: 'app-section',
   imports: [CommonModule], // Se você estiver usando Standalone Components, precisa importar CommonModule ou RouterLink, etc.
  templateUrl: './section.html',
  styleUrls: ['./section.css'] // Mudança de styleUrl para styleUrls
})

export class Section implements OnInit { // Implemente OnInit

  links: Link[] = [];

  constructor(private dataService: Data) { }

  ngOnInit(): void {
    this.dataService.getLinks().subscribe(
      (data: Link[]) => {
        // Mapeia os dados recebidos para adicionar a propriedade isActive
        this.links = data.map(link => ({ ...link, isActive: false }));
      },
      (error) => {
        console.error('Erro ao carregar links:', error);
        // Trate o erro de forma apropriada, talvez exibindo uma mensagem ao usuário
      }
    );
  }

  // Método chamado quando um link é clicado
  redirect(clickedLink: Link): void {
    // Primeiro, desativa todos os outros links
    this.links.forEach(link => link.isActive = false);

    // Ativa o link clicado
    clickedLink.isActive = true;

    // Redireciona
    window.open(clickedLink.link, '_blank'); // Abre em uma nova aba
  }
}
