export class EchoService {
  static echo(message: string) {
    return {
      content: [
        {
          type: 'text',
          text: message,
        } as const,
      ],
    };
  }
}
