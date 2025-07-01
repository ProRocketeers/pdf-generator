export async function getTemplate(templateId: string) {
  // TODO: Not implemented yet
  // const response = await fetch(`/api/v1/template/${templateId}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch template: ${response.statusText}`)
  // }

  // return response.json()

  // TODO: Replace this with a proper API call to fetch templates
  await new Promise(resolve => setTimeout(resolve, 3000))

  return {
    id: templateId,
    title: "Invoice",
    description: "Description of Template 1",
    templateUrl: "https://drive.google.com/uc?export=download&id=1qZS9uxSwsrHSMudfpDTbWQHBIM5vOnrF",
    templateType: "adocx",
    imageUrl: "https://example.com/template.png",
    variables: [
      {
        name: "name",
        type: "string",
        title: "Full Name",
        default: "John Doe"
      },
      {
        name: "amount",
        type: "number",
        title: "Amount",
        default: 100
      },
      {
        name: "currency",
        type: "string",
        title: "Currency",
        default: "EUR"
      },
      {
        name: "date",
        type: "date",
        title: "Date",
        default: "2025-05-04"
      },
      {
        name: "reference",
        type: "string",
        title: "Reference Number",
        default: "ABC123"
      }
    ]
  }
}
