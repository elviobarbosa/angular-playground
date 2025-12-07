import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { of } from "rxjs";

interface Mock {
  path: RegExp;
  mockData: (param?: string) => any;
}

function createPathRegExp(path: string) {
  const escapedPath = path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regexPattern = escapedPath.replace(/:(\w+)/g, "([^/]+)");
  return new RegExp(`^${regexPattern}$`);
}

const MOCKS: Mock[] = [
  {
    path: createPathRegExp("api/pix/search/:query"),
    mockData: (query) => {
      const allKeys = [
        {
          key: "12345678900",
          type: "CPF",
          owner: "João da Silva",
          bank: "Banco do Brasil",
        },
        {
          key: "98765432111",
          type: "CPF",
          owner: "Maria Santos",
          bank: "Itaú",
        },
        {
          key: "45678912322",
          type: "CPF",
          owner: "Pedro Oliveira",
          bank: "Nubank",
        },
        {
          key: "12345678000190",
          type: "CNPJ",
          owner: "Tech Solutions LTDA",
          bank: "Bradesco",
        },
        {
          key: "98765432000110",
          type: "CNPJ",
          owner: "Comércio Geral S.A.",
          bank: "Santander",
        },
        {
          key: "joao.silva@email.com",
          type: "EMAIL",
          owner: "João da Silva",
          bank: "Inter",
        },
        {
          key: "maria.santos@empresa.com.br",
          type: "EMAIL",
          owner: "Maria Santos",
          bank: "Caixa",
        },
        {
          key: "contato@techlabs.com",
          type: "EMAIL",
          owner: "Tech Labs LTDA",
          bank: "PagBank",
        },
        {
          key: "11987654321",
          type: "PHONE",
          owner: "Carlos Mendes",
          bank: "C6 Bank",
        },
        {
          key: "21998765432",
          type: "PHONE",
          owner: "Ana Paula Costa",
          bank: "Next",
        },
        {
          key: "85912345678",
          type: "PHONE",
          owner: "Roberto Lima",
          bank: "Banco do Brasil",
        },
        {
          key: "11976543210",
          type: "PHONE",
          owner: "Fernanda Rocha",
          bank: "Nubank",
        },
        {
          key: "a1b2c3d4e5f67890abcdef1234567890",
          type: "RANDOM",
          owner: "Lucas Pereira",
          bank: "PicPay",
        },
        {
          key: "9f8e7d6c5b4a3210fedcba0987654321",
          type: "RANDOM",
          owner: "Juliana Alves",
          bank: "Mercado Pago",
        },
      ];

      if (!query) return allKeys;

      const searchTerm = query.toLowerCase();
      return allKeys.filter((item) =>
        item.key.toLowerCase().includes(searchTerm)
      );
    },
  },
];

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  const mock = MOCKS.find((mock) => mock.path.test(req.url));

  if (mock) {
    const param = req.url.split("/").at(-1);
    const body = mock.mockData(param);

    return of(
      new HttpResponse({
        body,
        status: 200,
        statusText: "OK",
      })
    );
  }

  return next(req);
};
