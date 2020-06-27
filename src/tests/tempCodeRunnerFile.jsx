describe("Form behaviour",  () => {
    it('validate user inputs, and provides error messages', async () => {
      const { getByTestId, getByText } = render(<Login/>)
  
      await act (async () => {
        fireEvent.change(screen.getByLabelText(/username/i), {
          target: {value: ''},
        });
  
        fireEvent.change(screen.getByLabelText(/password/i), {
          target: {value: ''},
        })
      });
  
      await act (async () => {
        fireEvent.submit(getByTestId('form'))
      });
  
      expect(getByText("Please fill this field")).toBeInTheDocument();
    });
})