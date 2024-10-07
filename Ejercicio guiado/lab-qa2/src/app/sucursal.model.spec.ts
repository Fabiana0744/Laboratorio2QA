import { mock, when, instance } from 'ts-mockito';
import { Client } from './client.model';
import { Count } from './count';
import { Sucursal } from './sucursal.model';

/*
describe('Sucursal', () => {
  it('should create an instance', () => {
    expect(new Sucursal()).toBeTruthy();
  });
});
*/

describe('Sucursal', () => {
  let cliente: Client;
  let sucursal: Sucursal;
  let cuenta: Count;
  var withdrawlAmount2000 = 200000;
  var numeroCuenta = 12345;
  var balance = 100000;

  beforeEach(() => {
    sucursal = new Sucursal("Alajuela", "Alajuela");
    cliente = new Client("Juan", "Pérez", "25-01-76", "2401-3117", "Alajuela", 
   "jperez@gmail.com");
    sucursal.setClientes(cliente);
    cuenta = mock<Count>(); 
   });

   it('1. Saldo de cuenta', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    let mockito = instance(cuenta);
    expect(mockito.getCantidadDinero()).toBe(balance);
   });
   
   it('2. Agregar nueva cuenta a cliente', function () {
    var cuenta = mock<Count>();
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
   });
   
   it('3. Retirar monto válido', function () {
    var balanceAmount3000 = 300000;
    when(cuenta.getCantidadDinero()).thenReturn(balanceAmount3000);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    when(cuenta.retirar(withdrawlAmount2000)).thenReturn(balance); 
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    var saldo = cliente.retirar(withdrawlAmount2000, numeroCuenta);
    expect(saldo).toBe(balance);
   });

   it('4. Retirar más de lo permitido', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(function() {
    cliente.retirar(withdrawlAmount2000, numeroCuenta);
    }).toThrowError(Error, "Fondos insuficientes");
   });

  it('a. Aperturar cuenta con monto de 5000 colones', function () {
    when(cuenta.getCantidadDinero()).thenReturn(5000);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
    expect(mockito.getCantidadDinero()).toBe(5000);
  });
   
  it('b. Realizar dos depósitos válidos y verificar el saldo', () => {
    var deposito1 = 3000;
    var deposito2 = 2000;
    var saldoFinal = deposito1 + deposito2;

    when(cuenta.getCantidadDinero()).thenReturn(0);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);

    mockito.depositar(deposito1);
    mockito.depositar(deposito2);

    when(cuenta.getCantidadDinero()).thenReturn(saldoFinal); 
    expect(mockito.getCantidadDinero()).toBe(saldoFinal);
  });

  
  it('c. Liquidar una cuenta de cliente', function () {
    let mockito = instance(cuenta);
  
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    cliente.setCuentas(mockito);
  
    expect(cliente.getCuentas().length).toBe(1);
  
    cliente.eliminarCuenta(numeroCuenta);
    expect(cliente.getCuentas().length).toBe(0);
  });
  
});