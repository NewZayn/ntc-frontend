import { Component, input, inject } from '@angular/core';
import {
  StrapiBlock,
  StrapiInlineNode,
  StrapiTextNode,
  StrapiLinkNode,
  StrapiListItemBlock,
} from '../../models/strapi.models';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-block-renderer',
  imports: [],
  templateUrl: './block-renderer.html',
  styleUrl: './block-renderer.css',
})
export class BlockRenderer {
  content = input.required<StrapiBlock[]>();
  private strapi = inject(StrapiService);

  isText(node: StrapiInlineNode): node is StrapiTextNode {
    return node.type === 'text';
  }

  isLink(node: StrapiInlineNode): node is StrapiLinkNode {
    return node.type === 'link';
  }

  renderInline(nodes: StrapiInlineNode[]): string {
    return nodes
      .map((node) => {
        if (this.isLink(node)) {
          const innerText = this.renderInline(node.children);
          return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${innerText}</a>`;
        }
        const textNode = node as StrapiTextNode;
        let text = this.escapeHtml(textNode.text);
        if (textNode.bold) text = `<strong>${text}</strong>`;
        if (textNode.italic) text = `<em>${text}</em>`;
        if (textNode.underline) text = `<u>${text}</u>`;
        if (textNode.strikethrough) text = `<s>${text}</s>`;
        if (textNode.code) text = `<code>${text}</code>`;
        return text;
      })
      .join('');
  }

  renderListItem(item: StrapiListItemBlock): string {
    return this.renderInline(item.children);
  }

  getImageUrl(url: string): string {
    return this.strapi.getMediaUrl(url);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
